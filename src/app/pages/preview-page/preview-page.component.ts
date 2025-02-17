import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ContentSectionComponent } from "~components/content-section/content-section.component";
import { DatasetTableComponent } from "~components/dataset-table/dataset-table.component";

/** Page for displaying and interacting with tabular data from the API. */
@Component({
  standalone: true,
  selector: "table-page",
  templateUrl: "preview-page.component.html",
  imports: [
    DatasetTableComponent,
    ContentSectionComponent,
  ]
})
export class PreviewPageComponent {
  protected tableName!: string;

  /** Fetches the table name from URL parameters. */
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.tableName = params["tableName"]);
  }
}
