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
    this.dataService.getTableData().subscribe((data) => {
      if (data && data.pageData) {
        // Convert JSON to CSV
        const csvData = this.convertToCSV(data.pageData);

        // Create a blob for the CSV data
        const blob = new Blob([csvData], {type: "text/csv"});

        // Create a download link
        const link = this.renderer.createElement("a");
        link.setAttribute("target", "_self");
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", `pg_broker.csv`);

        // Trigger download and cleanup
        link.click();
        link.remove();
      }
    });
  }

  handleJSON(): void {
    this.dataService.getTableData().subscribe((data) => {
      if (data) {
        // Format the data for download
        const jsonStr = JSON.stringify(data.pageData, null, 2);
        const blob = new Blob([jsonStr], {type: "application/json"});

        // Create a download link
        const link = this.renderer.createElement("a");
        link.setAttribute("target", "_self");
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", `pg_broker.json`);

        // Trigger download and cleanup
        link.click();
        link.remove();
      }
    });
  }

  private convertToCSV(data: any[]): string {
    const header = Object.keys(data[0]);
    const rows = data.map(item => header.map(fieldName => JSON.stringify(item[fieldName], (key, value) =>
      value === null ? "" : value // Handle null values
    )).join(","));

    return [header.join(","), ...rows].join("\r\n");
  }
}
