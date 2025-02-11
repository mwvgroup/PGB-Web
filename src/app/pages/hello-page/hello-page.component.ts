import { Component } from "@angular/core";
import { ContentSectionComponent } from "../../common/components/content-section/content-section.component";

/** A simple placeholder page. */
@Component({
  selector: "landing-page",
  templateUrl: "hello-page.component.html",
  imports: [
    ContentSectionComponent
  ]
})
export class HelloPageComponent {}
