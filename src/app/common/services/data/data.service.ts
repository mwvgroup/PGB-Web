import { HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, shareReplay } from "rxjs";

import { APIService } from "~services/api/api.service";
import { PaginatedData, Schema } from "./data.interface";

/** Service for fetching data from the application database via the API. */
@Injectable({
  providedIn: "root"
})
export class DataService {
  private apiSchemaEndpoint: string = "meta/schema/";
  private dbSchema$!: Observable<Schema>;

  /**
   * Instantiate an observable for the database schema fetched from the API.
   * The API response is automatically cached for the lifetime of the service.
   */
  constructor(private apiService: APIService) {
    this.dbSchema$ = this.apiService.get(this.apiSchemaEndpoint).pipe(
      map((response: HttpResponse<Object>) => response.body as Schema),
      shareReplay(1)
    );
  }

  /**
   * Returns a list of table names from the database.
   * @returns An observable containing the database schema.
   */
  getTableNames(): Observable<string[]> {
    return this.dbSchema$.pipe(
      map((schema: Schema) => Object.keys(schema.tables))
    );
  }

  /**
   * Returns the column names for a given database table.
   * @param tableName The name of the table to fetch columns for.
   * @returns An observable containing table column names.
   */
  getColumnNames(tableName: string): Observable<string[]> {
    return this.dbSchema$.pipe(
      map((schema: Schema) => Object.keys(schema["tables"][tableName]["columns"]))
    );
  }

  /**
   * Returns data from a database table by name.
   * @param tableName The name of the table to fetch data from.
   * @param options Optional pagination/ordering settings for the returned data.
   * @returns An observable containing table data.
   */
  getTableData(
    tableName: string,
    options: { pageIndex?: number; pageSize?: number; orderBy?: string; direction?: string } = {}
  ): Observable<PaginatedData> {

    const {pageIndex = 0, pageSize = 0, orderBy, direction} = options;
    let params: HttpParams = new HttpParams({
      fromObject: {
        _offset_: pageIndex * pageSize,
        _limit_: pageSize
      }
    });

    if (orderBy) params = params.set("_order_by_", orderBy);
    if (direction) params = params.set("_direction_", direction);

    return this.apiService.get(`db/${tableName}/`, params).pipe(
      map((response: HttpResponse<Object>) => ({
        pageData: response.body,
        tableLength: Number(response.headers.get("x-pagination-total"))
      }))
    );
  }
}
