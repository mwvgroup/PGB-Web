import { Routes } from "@angular/router";

// Layout Components
import { BlankLayoutComponent } from "~layouts/blank-layout/blank-layout.component";
import { MenuBarLayoutComponent } from "~layouts/menu-bar-layout/menu-bar-layout.component";

// Page Components
import { AboutPageComponent } from "~pages/about-page/about-page.component";
import { DataPageComponent } from "~pages/data-page/data-page.component";
import { ErrorPageComponent } from "~pages/error-page/error-page.component";
import { GcpPageComponent } from "~pages/gcp-page/gcp-page.component";
import { LandingPageComponent } from "~pages/landing-page/landing-page.component";
import { PreviewPageComponent } from "~pages/preview-page/preview-page.component";

export const routes: Routes = [
  {
    path: "",
    component: MenuBarLayoutComponent,
    children: [
      {path: "", component: LandingPageComponent},
      {path: "about", component: AboutPageComponent},
      {path: "data", component: DataPageComponent},
      {path: "gcp", component: GcpPageComponent},
      {path: "preview/:tableName", component: PreviewPageComponent},
    ],
  },
  {
    path: "**", component: BlankLayoutComponent,
    children: [
      {path: "", component: ErrorPageComponent}
    ],
  },
];
