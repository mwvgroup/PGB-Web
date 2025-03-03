import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ContentSectionComponent } from "~components/content-section/content-section.component";
import { DatasetTableComponent } from "~components/dataset-table/dataset-table.component";
import { DownloadButtonComponent } from "~components/download-button/download-button.component";
import { DataService } from "~services/data/data.service";

/** Page for displaying and interacting with tabular data from the API. */
@Component({
  standalone: true,
  selector: "table-page",
  templateUrl: "preview-page.component.html",
  styleUrl: "preview-page.component.scss",
  imports: [
    DatasetTableComponent,
    ContentSectionComponent,
    DownloadButtonComponent,
  ]
})
export class PreviewPageComponent {
  protected tableName!: string;
  protected tableHasData: boolean = false;

  /** Fetches the table name from URL parameters. */
  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.route.params.subscribe(params => this.tableName = params["tableName"]);
    this.dataService.tableData$.subscribe(data => {
      this.tableHasData = Boolean(data?.pageData);
    });
  }
}
