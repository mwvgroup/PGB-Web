import { Component, Input, OnInit } from "@angular/core";
import { MatCard } from "@angular/material/card";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatSortModule, Sort } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { DataService } from "~services/data/data.service";

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

  protected data$!: Observable<Record<string, any>[]>;
  protected pageSizeOptions: number[] = [5, 10, 15];
  private pageCriteria: PageEvent | null = null;
  private sortCriteria: Sort | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.fetchTableColumns();
    this.fetchTableData();
  }

  /**
   * Updates the table sorting criteria and refreshes the displayed data.
   * @param $event - The sorting event emitted by the Sort component.
   */
  updateSorting($event: Sort) {
    this.sortCriteria = $event;
    this.fetchTableData();
  }

  /**
   * Updates the pagination criteria and refreshes the displayed data.
   * @param $event - The pagination event emitted Paginator component.
   */
  updatePagination($event: PageEvent) {
    this.pageCriteria = $event;
    this.fetchTableData();
  }

  /** Fetches the table schema to determine the columns to display. */
  private fetchTableColumns(): void {
    this.dataService.getTableColumns(this.tableName)
    .pipe(
      catchError(() => of([]))
    )
    .subscribe(
      columns => this.displayedColumns = Object.keys(columns)
    );
  }

  /**
   * Fetches table data from the API based on the current pagination and
   * ordering criteria.
   */
  private fetchTableData(): void {
    // Todo: include pagination and ordering params
    this.data$ = this.dataService.getTableData(this.tableName);
  }
}
