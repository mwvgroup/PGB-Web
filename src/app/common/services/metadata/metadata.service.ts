import { Injectable } from "@angular/core";
import { map, Observable, shareReplay } from "rxjs";

import { APIService } from "~services/api/api.service";
import { AppMeta } from "./metadata.interface";

/**
 * Service for fetching (and caching) application metadata from the API.
 **/
@Injectable({
  providedIn: "root"
})
export class MetadataService {
  // Define API endpoints and cache for API results
  private apiEndpoint: string = "meta/app";
  private apiCache$!: Observable<AppMeta>;

  constructor(private apiService: APIService) {}

  /**
   * Returns the application name.
   * @returns An observable containing the application name.
   */
  getTitle(): Observable<string> {
    return this.fetchAPIData().pipe(map(meta => meta.name));
  }

  /**
   * Returns the application version number.
   * @returns An observable containing the version string.
   */
  getVersion(): Observable<string> {
    return this.fetchAPIData().pipe(map(meta => meta.version));
  }

  /**
   * Fetches, caches, and returns application metadata from the API.
   * @returns An observable containing the metadata object.
   */
  private fetchAPIData(): Observable<AppMeta> {
    if (!this.apiCache$) {
      this.apiCache$ = this.apiService.get<AppMeta>(this.apiEndpoint).pipe(
        shareReplay(1)
      );
    }

    return this.apiCache$;
  }
}
