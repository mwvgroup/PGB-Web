import { Component } from "@angular/core";

import { ContentSectionComponent } from "~components/content-section/content-section.component";

/** A simple placeholder page. */
@Component({
  templateUrl: "landing-page.component.html",
  imports: [
    ContentSectionComponent
  ]
})
export class LandingPageComponent {}
