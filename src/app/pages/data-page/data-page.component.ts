import { Component } from "@angular/core";

import { ContentSectionComponent } from "~components/content-section/content-section.component";

/** Page describing PGB provided datasets (descriptions, schemas, etc.). */
@Component({
  templateUrl: "data-page.component.html",
  imports: [ContentSectionComponent]
})
export class DataPageComponent {}
