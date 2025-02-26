import { Component } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatButtonToggleGroup } from "@angular/material/button-toggle";
import { MatIcon } from "@angular/material/icon";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";

@Component({
  selector: "app-download-button",
  templateUrl: "download-button.component.html",
  imports: [
    MatButton,
    MatButtonToggleGroup,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ]
})
export class DownloadButtonComponent {}
