import { Component, OnInit } from "@angular/core";
import { MatToolbar } from "@angular/material/toolbar";
import { RouterLink, RouterOutlet } from "@angular/router";
import { MetadataService } from "~services/metadata/metadata.service";

/** Page layout with a navigation toolbar and page footer. */
@Component({
  templateUrl: "menu-bar-layout.component.html",
  styleUrl: "menu-bar-layout.component.scss",
  imports: [
    MatToolbar,
    RouterLink,
    RouterOutlet,
  ],
})
export class MenuBarLayoutComponent implements OnInit {
  protected version!: string;

  constructor(private metadataService: MetadataService) {}

  /** Load application metadata, including the title and version number. */
  ngOnInit(): void {
    this.metadataService.getVersion().subscribe(
      version => this.version = version
    );
  }
}
