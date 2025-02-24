import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, shareReplay } from "rxjs";

import { APIService } from "~services/api/api.service";
import { Schema } from "./data.interface";

/**
 * Service for fetching data from the application database via the API.
 **/
@Injectable({
  providedIn: "root"
})
export class DataService {

  // Define API endpoints and cache for API results
  private apiEndpoint: string = "meta/schema";
  private apiCache$!: Observable<Schema>;

  constructor(private apiService: APIService) {}

  /**
   * Returns a list of table names from the database.
   * @returns An observable containing the database schema.
   */
  getTableNames(): Observable<string[]> {
    return this.fetchDatabaseSchema().pipe(map(schema => Object.keys(schema.tables)));
  }

  /**
   * Returns data from a database table by name.
   * @param tableName The name of the table to fetch data from.
   * @param pageIndex The index of the page to fetch (optional).
   * @param pageSize The size of the page to fetch (optional).
   * @param orderBy The column name to sort by (optional).
   * @param direction The direction to sort by (optional).
   * @returns An observable containing table data.
   */
  getTableData(
    tableName: string, pageIndex?: number, pageSize?: number, orderBy?: string, direction?: string
  ): Observable<any> {

    let params = new HttpParams({
      fromObject: {
        _page_: pageIndex || 1,
        _limit_: pageSize || 0,
      }
    });

    if (orderBy) {
      params = params.set("_order_by_", orderBy);
    }

    if (direction) {
      params = params.set("_direction_", direction);
    }

    return this.apiService.get<any>(`db/${tableName}`, {params: params});
  }

  /**
   * Returns the column names included in a database.
   * @param tableName The name of the table to fetch columns for.
   * @returns An observable containing table column names.
   */
  getTableColumns(tableName: string): Observable<any> {
    return this.fetchDatabaseSchema().pipe(
      map(
        schema => schema["tables"][tableName]["columns"],
      )
    );
  }

  /**
   * Fetches, caches, and returns application metadata from the API.
   * @returns An observable containing the database schema.
   */
  private fetchDatabaseSchema(): Observable<Schema> {
    if (!this.apiCache$) {
      this.apiCache$ = this.apiService.get<Schema>(this.apiEndpoint).pipe(
        shareReplay(1)
      );
    }

    return this.apiCache$;
  }
}
