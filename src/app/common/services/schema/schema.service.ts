import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, shareReplay } from "rxjs";

import { APIService } from "~services/api/api.service";
import { Schema } from "./schema.interface";

@Injectable({
  providedIn: "root"
})
export class SchemaService {
  readonly dbSchema$!: Observable<Schema>;
  private readonly apiEndpoint: string = "meta/schema/";

  /**
   * Instantiate an observable for the database schema fetched from the API.
   * The API response is automatically cached for the lifetime of the service.
   */
  constructor(private apiService: APIService) {
    this.dbSchema$ = this.apiService.get(this.apiEndpoint).pipe(
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
}
