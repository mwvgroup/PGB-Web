import { Component, Input, OnInit } from "@angular/core";
import { MatCard } from "@angular/material/card";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatSortModule, Sort } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";

import { environment } from "~environments/environment";
import { DataService } from "~services/data/data.service";
import { SchemaService } from "~services/schema/schema.service";

/**
 * Provides a tabular view for a project dataset with support for pagination,
 * sorting, filtering, and downloads.
 **/
@Component({
  standalone: true,
  selector: "app-dataset-view-table",
  templateUrl: "dataset-table.component.html",
  styleUrl: "dataset-table.component.scss",
  imports: [
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatCard,
  ],
})
export class DatasetTableComponent implements OnInit {
  @Input() tableName!: string;
  @Input() displayedColumns: string[] = [];

  // Store the displayed data
  protected pageData: Record<string, any>[] = [];
  protected tableLength!: number;

  // Pagination variables
  protected pageIndex: number = 0;
  protected pageSize: number = environment.pageSizeDefault;
  protected pageSizeOptions: number[] = environment.pageSizeOptions;

  // Sorting variables
  protected sortColumn: String = "";
  protected sortDirection: "asc" | "desc" | "" = "";

  constructor(private schemaService: SchemaService, private dataService: DataService) {}

  ngOnInit() {
    this.fetchTableColumns();
    this.fetchTableData();

    this.dataService.tableData$.subscribe(data => {
      this.pageData = data?.pageData || [];
      this.tableLength = data?.tableLength || 0;
    });
  }

  /**
   * Updates the table sorting criteria and refreshes the displayed data.
   * @param $event - The sorting event emitted by the Sort component.
   */
  protected updateSorting($event: Sort) {
    this.sortColumn = $event.active;
    this.sortDirection = $event.direction;
    this.fetchTableData();
  }

  /**
   * Updates the pagination criteria and refreshes the displayed data.
   * @param $event - The pagination event emitted by the Paginator component.
   */
  protected updatePagination($event: PageEvent) {
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex;
    this.fetchTableData();
  }

  /** Fetches the table schema to determine the columns to display. */
  private fetchTableColumns(): void {
    this.schemaService.getColumnNames(this.tableName)
    .pipe(
      catchError(() => of([]))
    )
    .subscribe(
      (columns: string[]) => this.displayedColumns = columns
    );
  }

  /**
   * Fetches table data from the API based on the current pagination/ordering criteria.
   */
  private fetchTableData(): void {
    this.dataService.fetchTableData(
      this.tableName, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        orderBy: this.sortColumn as string,
        direction: this.sortDirection
      }
    );
  }
}
