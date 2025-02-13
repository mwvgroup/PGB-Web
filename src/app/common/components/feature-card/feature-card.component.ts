import { Component, Input } from "@angular/core";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";

@Component({
  selector: "app-feature-card",
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
  ],
  templateUrl: "feature-card.component.html",
  styleUrl: "feature-card.component.scss"
})
export class FeatureCardComponent {
  @Input() href?: string;
}
