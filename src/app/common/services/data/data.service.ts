import { HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, tap } from "rxjs";

import { APIService } from "~services/api/api.service";
import { PaginatedData } from "./data.interface";

/** Service for fetching data from the application database via the API. */
@Injectable({
  providedIn: "root"
})
export class DataService {
  tableData$: BehaviorSubject<PaginatedData | null> = new BehaviorSubject<PaginatedData | null>(null);

  constructor(private apiService: APIService) {}

  /**
   * Fetches data from a database table by name and updates subscribers.
   * @param tableName The name of the table to fetch data from.
   * @param options Pagination/ordering settings for the returned data.
   */
  fetchTableData(
    tableName: string,
    options: { pageIndex?: number; pageSize?: number; orderBy?: string; direction?: string } = {}
  ): void {
    const url: string = `db/${tableName}/`;
    const params: HttpParams = this.buildRequestParams(options);

    this.apiService.get(url, params).pipe(
      map((response: HttpResponse<Object>) => ({
        pageData: response.body,
        tableLength: Number(response.headers.get("x-pagination-total"))
      })),
      tap((data) => this.tableData$.next(data))
    ).subscribe();
  }

  /**
   * Generates HTTP query parameters for paginated data requests.
   * @param options Pagination/ordering settings.
   * @returns HTTP query parameters suitable for paginating data.
   */
  private buildRequestParams(options: { pageIndex?: number; pageSize?: number; orderBy?: string; direction?: string }) {
    const {pageIndex = 0, pageSize = 0, orderBy, direction} = options;
    let params: HttpParams = new HttpParams({
      fromObject: {
        _offset_: pageIndex * pageSize,
        _limit_: pageSize
      }
    });

    if (orderBy) params = params.set("_order_by_", orderBy);
    if (direction) params = params.set("_direction_", direction);
    return params;
  }
}
