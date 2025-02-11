import { Routes } from "@angular/router";

// Layout Components
import { CenterLayoutComponent } from "~layouts/center-layout/center-layout.component";
import { MenuBarLayoutComponent } from "~layouts/menu-bar-layout/menu-bar-layout.component";

// Page Components
import { ErrorPageComponent } from "~pages/error-page/error-page.component";
import { HelloPageComponent } from "~pages/hello-page/hello-page.component";

export const routes: Routes = [
  {
    path: "",
    component: MenuBarLayoutComponent,
    children: [
      {path: "", component: HelloPageComponent}
    ],
  },
  {
    path: "**", component: CenterLayoutComponent,
    children: [
      {path: "", component: ErrorPageComponent},
    ],
  },
];
