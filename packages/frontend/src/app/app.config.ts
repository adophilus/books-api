import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { provideTransloco, TranslocoLoader } from "@ngneat/transloco";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

import { routes } from "./app.routes";
import { HttpLoader, SupportedLanguages } from "./transloco-loader";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideTransloco({
      config: {
        availableLangs: SupportedLanguages,
        defaultLang: "en",
        fallbackLang: "en",
        reRenderOnLangChange: true,
        prodMode: false,
      },
      loader: HttpLoader,
    }),
  ],
};
