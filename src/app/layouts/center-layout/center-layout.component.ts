import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

/** Minimal layout component for centering content in the middle of the page. */
@Component({
  imports: [RouterOutlet],
  templateUrl: "center-layout.component.html",
  styleUrl: "center-layout.component.scss",
})
export class CenterLayoutComponent {}
