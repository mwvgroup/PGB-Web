import { HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, tap } from "rxjs";

import { APIService } from "~services/api/api.service";
import { PaginatedData, PaginatedOptions } from "./data.interface";

/** Service for fetching data from the application database via the API. */
@Injectable({
  providedIn: "root",
})
export class DataService {
  private tableData$ = new BehaviorSubject<PaginatedData | null>(null);

  constructor(private apiService: APIService) {}

  /**
   * Retrieves the table data as an observable and triggers a fetch request.
   * @param tableName The name of the table to fetch data from.
   * @param options Pagination/ordering settings for the returned data.
   * @returns A BehaviorSubject containing the table data.
   */
  getTableData(tableName: string, options: PaginatedOptions = {}): BehaviorSubject<PaginatedData | null> {
    this.refreshTableData(tableName, options);
    return this.tableData$;
  }

  /**
   * Fetches data from a database table by name and updates subscribers.
   * @param tableName The name of the table to fetch data from.
   * @param options Pagination/ordering settings for the returned data.
   */
  refreshTableData(tableName: string, options: PaginatedOptions = {}): void {
    const params: HttpParams = this.buildHttpParams(options);
    this.apiService.get(`db/${tableName}/`, params).pipe(
      map((response: HttpResponse<Object>) => this.transformResponse(response)),
      tap((data: PaginatedData) => this.tableData$.next(data))
    ).subscribe();
  }

  /**
   * Builds HTTP parameters for API requests based on pagination and sorting options.
   * @param options Pagination/ordering settings for the request.
   * @returns A HttpParams object with the appropriate query parameters.
   */
  private buildHttpParams({pageIndex = 0, pageSize = 0, orderBy, direction}: PaginatedOptions): HttpParams {
    let params = new HttpParams()
      .set("_offset_", (pageIndex * pageSize).toString())
      .set("_limit_", pageSize.toString());

    if (orderBy) params = params.set("_order_by_", orderBy);
    if (direction) params = params.set("_direction_", direction);

    return params;
  }

  /**
   * Transforms the HTTP response into a structured PaginatedData object.
   * @param response The HTTP response from the API.
   * @returns The transformed PaginatedData object.
   */
  private transformResponse(response: HttpResponse<Object>): PaginatedData {
    return {
      pageData: response.body,
      tableLength: Number(response.headers.get("x-pagination-total")),
    };
  }
}
