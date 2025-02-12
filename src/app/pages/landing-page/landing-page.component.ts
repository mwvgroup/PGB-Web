import { Component } from "@angular/core";

import { ContentSectionComponent } from "~components/content-section/content-section.component";
import { HeroSectionComponent } from "~components/hero-section/hero-section.component";

/** A simple placeholder page. */
@Component({
  templateUrl: "landing-page.component.html",
  imports: [
    ContentSectionComponent,
    HeroSectionComponent,
  ],
})
export class LandingPageComponent {}
