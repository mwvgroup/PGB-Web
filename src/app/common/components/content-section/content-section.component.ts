import { Component, Input } from "@angular/core";

/**
 * A reusable content wrapper used to structure distinct sections within a page.
 *
 * Inputs:
 * - `title`: Optional title text for the content section.
 */
@Component({
  selector: "app-content-section",
  templateUrl: "content-section.component.html",
  styleUrl: "content-section.component.scss",
})
export class ContentSectionComponent {
  @Input() title!: string;
}
