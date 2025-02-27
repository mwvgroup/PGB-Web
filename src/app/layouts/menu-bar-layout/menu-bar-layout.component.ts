import { Component, OnInit } from "@angular/core";
import { MatToolbar } from "@angular/material/toolbar";
import { RouterLink, RouterOutlet } from "@angular/router";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "~environments/environment";
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
  projectSourceUrl: string = environment.projectSourceUrl;
  protected version!: string;

  constructor(private metadataService: MetadataService) {}

  /** Load application metadata, including the title and version number. */
  ngOnInit(): void {
    this.metadataService.getAppVersion()
    .pipe(
      catchError(() => of(""))
    )
    .subscribe({
      next: version => this.version = version,
    });
  }
}
