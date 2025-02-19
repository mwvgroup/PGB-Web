import { NgClass } from "@angular/common";
import { Component, Input } from "@angular/core";

/**
 * A reusable content wrapper used to structure distinct sections within a page.
 * Supports an optional alternative style with background/text styling for a
 * clear, visual separation from neighboring sections.
 *
 * Inputs:
 * - `title`: Optional title text for the content section.
 * - `altStyle`: Boolean used to enable alternative styling.
 */
@Component({
  selector: "app-content-section",
  templateUrl: "content-section.component.html",
  styleUrl: "content-section.component.scss",
  imports: [NgClass]
})
export class ContentSectionComponent {
  @Input() title!: string;
  @Input() altStyle: boolean = false;
}
