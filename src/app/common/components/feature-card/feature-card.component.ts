import { Component, Input } from "@angular/core";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";

/**
 * A card component that displays an icon, title, description, and action link.
 * Used primarily to highlight application features or a call to action.
 *
 * Inputs:
 * - `title`: The card heading text.
 * - `icon`: The Material icon name to display.
 * - `description`: A brief text description displayed below the title.
 * - `action`: The text for the action link (defaults to "Learn More").
 * - `href`: Renders the entire card as a clickable link to the given location.
 */
@Component({
  selector: "app-feature-card",
  imports: [
    MatCard,
    MatCardContent,
    MatIcon,
  ],
  templateUrl: "feature-card.component.html",
  styleUrl: "feature-card.component.scss"
})
export class FeatureCardComponent {
  @Input() href: string = "";
  @Input() icon: string = "";
  @Input() title: string = "";
  @Input() description: string = "";
  @Input() action: string = "Learn More";
}
