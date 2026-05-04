import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';
import { PdfEngineOptions, PdfOrientation } from './pdf.types';

@Injectable()
export class PdfEngine {
  private readonly logger = new Logger(PdfEngine.name);
  private browser: Browser | null = null;
  private activePagesCount = 0;
  private isGenerating = false;
  private generationQueue: Array<() => Promise<void>> = [];
  private pdfGeneratedCount = 0; // ✅ Compteur pour redémarrage périodique
  private readonly MAX_PDFS_BEFORE_RESTART = 10; // ✅ Redémarrer tous les 10 PDFs

  /**
   * Obtient ou crée une instance de navigateur réutilisable
   */
  private async getBrowser(): Promise<Browser> {
    // ✅ Redémarrer le navigateur après N générations pour éviter les fuites mémoire
    if (
      this.browser &&
      this.pdfGeneratedCount >= this.MAX_PDFS_BEFORE_RESTART
    ) {
      this.logger.log(
        `Redémarrage préventif du navigateur après ${this.pdfGeneratedCount} PDFs`,
      );
      await this.closeBrowser();
    }

    if (!this.browser || !this.browser.isConnected()) {
      try {
        this.browser = await puppeteer.launch({
          headless: true,
          executablePath: process.env.PUPPETEER_EXECUTABLE_PATH  || '/usr/bin/google-chrome',
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process',
            '--disable-accelerated-2d-canvas',
            '--disable-software-rasterizer',
            '--no-first-run',
            '--no-default-browser-check',
            '--disable-background-networking',
            '--disable-default-apps',
            '--disable-extensions',
            '--disable-sync',
            '--metrics-recording-only',
          ],
        });

        this.pdfGeneratedCount = 0; // ✅ Reset du compteur
        this.logger.log('Instance Puppeteer démarrée');

        // ✅ Gérer les déconnexions inattendues
        this.browser.on('disconnected', () => {
          this.logger.warn('Navigateur déconnecté de manière inattendue');
          this.browser = null;
        });
      } catch (error) {
        this.logger.error('Erreur lors du lancement de Puppeteer', error);
        throw error;
      }
    }
    return this.browser;
  }

  /**
   * Ferme le navigateur proprement
   */
  private async closeBrowser(): Promise<void> {
    if (this.browser) {
      try {
        await this.browser.close();
        this.browser = null;
        this.logger.log('Navigateur fermé');
      } catch (error) {
        this.logger.warn('Erreur lors de la fermeture du navigateur', error);
        this.browser = null;
      }
    }
  }

  /**
   * Génère un PDF à partir d'un HTML avec gestion de la concurrence
   */
  async generate(options: PdfEngineOptions): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      this.generationQueue.push(async () => {
        try {
          const result = await this.generateInternal(options);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      this.processQueue();
    });
  }

  /**
   * Traite la queue de génération une par une
   */
  private async processQueue(): Promise<void> {
    if (this.isGenerating || this.generationQueue.length === 0) {
      return;
    }

    this.isGenerating = true;

    while (this.generationQueue.length > 0) {
      const task = this.generationQueue.shift();
      if (task) {
        try {
          await task();
        } catch (error) {
          this.logger.error('Erreur dans la queue de génération', error);
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    this.isGenerating = false;
  }

  /**
   * Génération interne du PDF avec retry automatique
   */
  private async generateInternal(
    options: PdfEngineOptions,
    retryCount = 0,
  ): Promise<Buffer> {
    const {
      html,
      format = 'A4',
      orientation = PdfOrientation.PORTRAIT,
      margin = { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' },
      printBackground = true,
    } = options;

    let page: Page | null = null;

    try {
      const browser = await this.getBrowser();
      page = await browser.newPage();
      this.activePagesCount++;

      this.logger.debug(
        `Pages actives: ${this.activePagesCount}, PDFs générés: ${this.pdfGeneratedCount}`,
      );

      // Configurer la page
      await page.setDefaultTimeout(120_000);
      await page.setDefaultNavigationTimeout(120_000);

      // ✅ Désactiver les ressources inutiles pour économiser la mémoire
      await page.setRequestInterception(true);
      page.on('request', (request) => {
        const resourceType = request.resourceType();
        if (
          ['font', 'stylesheet', 'media', 'websocket'].includes(resourceType)
        ) {
          request.abort();
        } else {
          request.continue();
        }
      });

      // Charger le contenu HTML
      await page.setContent(html, {
        waitUntil: 'domcontentloaded',
        timeout: 120_000,
      });

      // Attendre le chargement des images avec timeout
      try {
        await page.evaluate(() => {
          return Promise.race([
            Promise.all(
              Array.from(document.images)
                .filter((img) => !img.complete)
                .map(
                  (img) =>
                    new Promise((resolve) => {
                      img.onload = img.onerror = resolve;
                    }),
                ),
            ),
            new Promise((resolve) => setTimeout(resolve, 8000)),
          ]);
        });
      } catch (imageError) {
        this.logger.warn('Timeout chargement images, continuation');
      }

      // Générer le PDF
      const pdf = await page.pdf({
        // format,
        landscape: orientation === PdfOrientation.LANDSCAPE,
        // printBackground,
        // margin,
        // preferCSSPageSize: false,

        //
        format: 'A4', // ✅ Format A4 exact
        // landscape: false, // ✅ Portrait
        printBackground: true, // ✅ Garde les couleurs
        margin: {
          top: '0mm',
          bottom: '0mm',
          left: '0mm',
          right: '0mm',
        }, // ✅ Pas de marges supplémentaires
        preferCSSPageSize: false,
        scale: 1, // ✅ Échelle 1:1
      });

      this.pdfGeneratedCount++; // ✅ Incrémenter le compteur
      this.logger.debug(`PDF généré avec succès (${pdf.length} bytes)`);
      return Buffer.from(pdf);
    } catch (error) {
      // ✅ Retry automatique si crash du navigateur
      if (
        (error.message?.includes('Target closed') ||
          error.message?.includes('Connection closed') ||
          error.message?.includes('Protocol error')) &&
        retryCount < 2
      ) {
        this.logger.warn(
          `Crash détecté, retry ${retryCount + 1}/2 après redémarrage`,
        );
        await this.closeBrowser();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return this.generateInternal(options, retryCount + 1);
      }

      this.logger.error(
        'Erreur lors de la génération du PDF',
        error.stack || error,
      );
      throw new InternalServerErrorException(
        `La génération du PDF a échoué: ${error.message}`,
      );
    } finally {
      if (page) {
        try {
          if (!page.isClosed()) {
            await page.close();
            this.activePagesCount--;
            this.logger.debug(
              `Page fermée. Pages actives: ${this.activePagesCount}`,
            );
          }
        } catch (err) {
          this.logger.warn('Erreur lors de la fermeture de la page');
        }
      }
    }
  }

  /**
   * Ferme proprement le navigateur
   */
  async shutdown(): Promise<void> {
    while (this.isGenerating || this.generationQueue.length > 0) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    await this.closeBrowser();
    this.activePagesCount = 0;
    this.pdfGeneratedCount = 0;
  }

  /**
   * Force le redémarrage du navigateur
   */
  async restartBrowser(): Promise<void> {
    this.logger.log('Redémarrage manuel du navigateur');
    await this.closeBrowser();
    await this.getBrowser();
  }

  getActivePagesCount(): number {
    return this.activePagesCount;
  }

  getQueueLength(): number {
    return this.generationQueue.length;
  }

  getPdfGeneratedCount(): number {
    return this.pdfGeneratedCount;
  }
}
