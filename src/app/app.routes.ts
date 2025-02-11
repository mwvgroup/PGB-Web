import { Routes } from "@angular/router";

// Layout Components
import { CenterLayoutComponent } from "~layouts/center-layout/center-layout.component";
import { ErrorPageComponent } from "~pages/error-page/error-page.component";

// Page Components
import { HelloPageComponent } from "~pages/hello-page/hello-page.component";

export const routes: Routes = [
  {
    path: "",
    component: CenterLayoutComponent,
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
