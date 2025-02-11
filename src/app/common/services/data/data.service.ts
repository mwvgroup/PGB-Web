import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { APIService } from "~services/api/api.service";

/**
 * Service for fetching data from the application database via the API.
 **/
@Injectable({
  providedIn: "root"
})
export class DataService {

  constructor(private apiService: APIService) {}

  /**
   * Returns data from a database table by name.
   * @param tableName The name of the table to fetch data from
   * @returns An observable containing table data.
   */
  getTableData(tableName: string): Observable<any> {
    return this.apiService.get<any>(`db/${tableName}`);
  }
}
