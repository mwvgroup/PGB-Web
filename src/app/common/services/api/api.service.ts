import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "~environments/environment";

interface RequestOptions {
  body?: any;
  params?: HttpParams;
  observe: "response";
}

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
   * @param params Optional HTTP parameters for the request.
   */
  get(endpoint: string, params?: HttpParams): Observable<HttpResponse<Object>> {
    return this.sendRequest("GET", endpoint, undefined, params);
  }

  /**
   * Send a POST request to the API.
   * @param endpoint The API endpoint (relative to the base URL).
   * @param data The data to send in the request body.
   * @param params Optional HTTP parameters for the request.
   */
  post(endpoint: string, data: any, params?: HttpParams): Observable<HttpResponse<Object>> {
    return this.sendRequest("POST", endpoint, data, params);
  }

  /**
   * Send a PUT request to the API.
   * @param endpoint The API endpoint (relative to the base URL).
   * @param data The data to send in the request body.
   * @param params Optional HTTP parameters for the request.
   */
  put(endpoint: string, data: any, params?: HttpParams): Observable<HttpResponse<Object>> {
    return this.sendRequest("PUT", endpoint, data, params);
  }

  /**
   * Send a PATCH request to the API.
   * @param endpoint The API endpoint (relative to the base URL).
   * @param data The data to send in the request body.
   * @param params Optional HTTP parameters for the request.
   */
  patch(endpoint: string, data: any, params?: HttpParams): Observable<HttpResponse<Object>> {
    return this.sendRequest("PATCH", endpoint, data, params);
  }

  /**
   * Send a DELETE request to the API.
   * @param endpoint The API endpoint (relative to the base URL).
   * @param params Optional HTTP parameters for the request.
   */
  delete(endpoint: string, params?: HttpParams): Observable<HttpResponse<Object>> {
    return this.sendRequest("DELETE", endpoint, undefined, params);
  }

  /**
   * Resolve an API endpoint against the base URL.
   * @param endpoint The endpoint relative to the base URL.
   */
  private resolveUrl(endpoint: string): string {
    const clean_endpoint: string = endpoint.replace(/^\//, "");
    return `${this.baseUrl}/${clean_endpoint}`;
  }

  /**
   * Send an arbitrary HTTP request.
   * @param method The HTTP method (GET, POST, PUT, DELETE, etc.).
   * @param endpoint The API endpoint (relative to the base URL).
   * @param body Optional data to send in the request body.
   * @param params Optional HTTP parameters for the request.
   */
  private sendRequest(
    method: string,
    endpoint: string,
    body?: any,
    params?: HttpParams
  ): Observable<HttpResponse<Object>> {
    const url: string = this.resolveUrl(endpoint);
    const options: RequestOptions = {params, body, observe: "response"};

    return this.http.request(method, url, options).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handle HTTP errors.
   * @param error The error response.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }
}
