import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

/** Minimal layout component with no custom styling or wrappers. */
@Component({
  template: "<router-outlet/>",
  imports: [RouterOutlet],
})
export class BlankLayoutComponent {}
