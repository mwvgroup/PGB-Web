import { Routes } from "@angular/router";

// Layout Components
import { BlankLayoutComponent } from "~layouts/blank-layout/blank-layout.component";
import { MenuBarLayoutComponent } from "~layouts/menu-bar-layout/menu-bar-layout.component";
import { DataPageComponent } from "~pages/data-page/data-page.component";

// Page Components
import { ErrorPageComponent } from "~pages/error-page/error-page.component";
import { GcpPageComponent } from "~pages/gcp-page/gcp-page.component";
import { AboutPageComponent } from "~pages/getting-started-page/about-page.component";
import { LandingPageComponent } from "~pages/landing-page/landing-page.component";

export const routes: Routes = [
  {
    path: "",
    component: MenuBarLayoutComponent,
    children: [
      {path: "", component: LandingPageComponent},
      {path: "about", component: AboutPageComponent},
      {path: "data", component: DataPageComponent},
      {path: "gcp", component: GcpPageComponent},
    ],
  },
  {
    path: "**", component: BlankLayoutComponent,
    children: [
      {path: "", component: ErrorPageComponent}
    ],
  },
];
