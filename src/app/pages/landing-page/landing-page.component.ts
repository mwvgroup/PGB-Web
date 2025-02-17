import { Component } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { Router } from "@angular/router";

import { ContentSectionComponent } from "~components/content-section/content-section.component";
import { DatasetFormComponent } from "~components/dataset-form/dataset-form.component";
import { DatasetFormInterface } from "~components/dataset-form/dataset-form.interface";
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
    DatasetFormComponent,
    MatIcon,
  ],
})
export class LandingPageComponent {

  constructor(private router: Router) {}

  /**
   * Handles form submission by navigating to the selected table.
   * @param formData The data submitted by the table selection form.
   */
  handleFormSubmit(formData: DatasetFormInterface): void {
    void this.router.navigate(["preview", formData.tableName]);
  }
}
