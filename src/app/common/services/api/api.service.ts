import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { environment } from "~environments/environment";
import { RequestOptions } from "./api.interface";

/**
 * Low level service used to facilitate consistent interaction with the API.
 * This service is intended as a building block for other services, and should
 * not be used directly by application components.
 */
@Injectable({
  providedIn: "root"
})
export class APIService {

  /** The API URL without any trailing slashes. */
  private baseUrl: string = environment.apiUrl.replace(/\/$/, "");

  constructor(private http: HttpClient) {}

  /**
   * Send a GET request to the API.
   * @param endpoint The API endpoint (relative to the base URL).
   * @param options Optional settings such as headers or query parameters.
   */
  get<T>(endpoint: string, options?: RequestOptions): Observable<T> {
    return this.http.get<T>(this.resolveUrl(endpoint), options).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Send a POST request to the API.
   * @param endpoint The API endpoint.
   * @param data The data to send in the request body.
   * @param options Optional settings such as headers.
   */
  post<T>(endpoint: string, data: any, options?: RequestOptions): Observable<T> {
    return this.http.post<T>(this.resolveUrl(endpoint), data, options).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Send a PUT request to the API.
   * @param endpoint The API endpoint.
   * @param data The data to update.
   * @param options Optional settings such as headers.
   */
  put<T>(endpoint: string, data: any, options?: RequestOptions): Observable<T> {
    return this.http.put<T>(this.resolveUrl(endpoint), data, options).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Send a PATCH request to the API.
   * @param endpoint The API endpoint.
   * @param data The data to update.
   * @param options Optional settings such as headers.
   */
  patch<T>(endpoint: string, data: any, options?: RequestOptions): Observable<T> {
    return this.http.patch<T>(this.resolveUrl(endpoint), data, options).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Send a DELETE request to the API.
   * @param endpoint The API endpoint.
   * @param options Optional settings such as headers or query parameters.
   */
  delete<T>(endpoint: string, options?: RequestOptions): Observable<T> {
    return this.http.delete<T>(this.resolveUrl(endpoint), options).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Resolve an API endpoint against the base URL.
   * @param endpoint The endpoint relative to the base URL.
   */
  private resolveUrl(endpoint: string): string {
    const clean_endpoint = endpoint.replace(/^\//, "");
    return `${this.baseUrl}/${clean_endpoint}`;
  }

  /**
   * Handle HTTP errors.
   * @param error The error response.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error("APIService Error:", error);
    return throwError(() => new Error("An error occurred while processing the request."));
  }
}
