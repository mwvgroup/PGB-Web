import { Component, Renderer2 } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatButtonToggleGroup } from "@angular/material/button-toggle";
import { MatIcon } from "@angular/material/icon";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { DataService } from "~services/data/data.service";

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
export class DownloadButtonComponent {

  constructor(private renderer: Renderer2, private dataService: DataService) {}

  handleCSV(): void {
    this.dataService.tableData$.subscribe((data) => {
      if (data && data.pageData) {
        const content: string = this.convertToCSV(data.pageData);
        this.triggerDownload(content, "text/csv", "pg_broker.csv");
      }
    });
  }

  handleJSON(): void {
    this.dataService.tableData$.subscribe((data) => {
      if (data) {
        const content: string = JSON.stringify(data, null, 2);
        this.triggerDownload(content, "application/json", "pg_broker.json");
      }
    });
  }

  private convertToCSV(data: any[]): string {
    const header: string[] = Object.keys(data[0]);
    const rows: string[] = data.map(item => header.map(fieldName => JSON.stringify(item[fieldName], (key, value) =>
      value === null ? "" : value // Handle null values
    )).join(","));

    return [header.join(","), ...rows].join("\r\n");
  }

  private triggerDownload(content: string, type: string, filename: string): void {
    const blob = new Blob([content], {type});
    const link: HTMLAnchorElement = this.renderer.createElement("a");

    link.setAttribute("target", "_self");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", filename);
    link.click();
    link.remove();
  }
}
