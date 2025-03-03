import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, shareReplay } from "rxjs";

import { APIService } from "~services/api/api.service";
import { AppMeta } from "./metadata.interface";

/** Service for fetching application metadata from the API. */
@Injectable({
  providedIn: "root"
})
export class MetadataService {
  private readonly appMetadata$!: Observable<AppMeta>;
  private readonly apiEndpoint: string = "meta/app/";

  /**
   * Instantiates an observable for application metadata fetched from the API.
   * The API response is automatically cached for the lifetime of the service.
   */
  constructor(private apiService: APIService) {
    this.appMetadata$ = this.apiService.get(this.apiEndpoint).pipe(
      map((response: HttpResponse<Object>) => response.body as AppMeta),
      shareReplay(1)
    );
  }

  /**
   * Returns the application version number.
   * @returns An observable containing the version string.
   */
  getAppVersion(): Observable<string> {
    return this.appMetadata$.pipe(
      map((meta: AppMeta) => meta.version)
    );
  }
}
