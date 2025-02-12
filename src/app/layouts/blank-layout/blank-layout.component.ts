import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

/** Minimal layout component with no custom styling or wrappers. */
@Component({
  imports: [RouterOutlet],
  template: "<router-outlet/>",
})
export class BlankLayoutComponent {}
