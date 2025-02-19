import { NgClass } from "@angular/common";
import { Component, Input } from "@angular/core";

/** Wrap page content with reasonable padding/margins. */
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
