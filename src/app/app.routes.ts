import { Routes } from "@angular/router";

// Layout Components
import { BlankLayoutComponent } from "~layouts/blank-layout/blank-layout.component";
import { MenuBarLayoutComponent } from "~layouts/menu-bar-layout/menu-bar-layout.component";

// Page Components
import { ErrorPageComponent } from "~pages/error-page/error-page.component";
import { LandingPageComponent } from "~pages/landing-page/landing-page.component";

export const routes: Routes = [
  {
    path: "",
    component: MenuBarLayoutComponent,
    children: [
      {path: "", component: LandingPageComponent}
    ],
  },
  {
    path: "**", component: BlankLayoutComponent,
    children: [
      {path: "", component: ErrorPageComponent},
    ],
  },
];
