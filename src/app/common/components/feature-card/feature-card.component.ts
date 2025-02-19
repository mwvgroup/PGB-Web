import { Component, Input } from "@angular/core";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";

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
}
