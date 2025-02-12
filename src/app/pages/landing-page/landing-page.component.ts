import { Component } from "@angular/core";

import { ContentSectionComponent } from "~components/content-section/content-section.component";
import { FeatureCardComponent } from "~components/feature-card/feature-card.component";
import { HeroSectionComponent } from "~components/hero-section/hero-section.component";

/**
 * Application landing page, providing a general project overview and links
 * to additional project documentation/resources.
 */
@Component({
  templateUrl: "landing-page.component.html",
  styleUrl: "landing-page.component.scss",
  imports: [
    ContentSectionComponent,
    FeatureCardComponent,
    HeroSectionComponent,
  ],
})
export class LandingPageComponent {}
