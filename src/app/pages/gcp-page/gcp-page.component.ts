import { Component } from "@angular/core";

import { ContentSectionComponent } from "~components/content-section/content-section.component";

/** Page providing getting-started style instructions for leveraging PGB data in GCP. */
@Component({
  templateUrl: "gcp-page.component.html",
  imports: [ContentSectionComponent]
})
export class GcpPageComponent {}
