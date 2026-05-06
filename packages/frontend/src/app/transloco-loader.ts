import { Translation, TranslocoLoader } from "@ngneat/transloco";
import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export const SupportedLanguages = ["en", "fr"];

export class HttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}
