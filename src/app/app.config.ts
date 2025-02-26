import { provideHttpClient, withFetch } from "@angular/common/http";
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideClientHydration(
      withEventReplay(),
      withHttpTransferCacheOptions({
        // Allow the client to access headers from the API
        includeHeaders: [
          "x-pagination-limit",
          "x-pagination-offset",
          "x-pagination-total",
          "x-order-by",
          "x-order-direction",
        ],
      })
    ),
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideZoneChangeDetection({eventCoalescing: true}),
  ]
};
