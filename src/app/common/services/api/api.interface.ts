import { HttpHeaders, HttpParams } from "@angular/common/http";

/** Interface for optional values in an HTTP request. */
export interface RequestOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
}
