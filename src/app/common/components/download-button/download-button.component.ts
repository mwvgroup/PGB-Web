import { Component, Renderer2 } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatButtonToggleGroup } from "@angular/material/button-toggle";
import { MatIcon } from "@angular/material/icon";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { PaginatedData } from "~services/data/data.interface";
import { DataService } from "~services/data/data.service";

/** Download button with support for data in different formats (CSV, JSON). */
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
  private tableData: PaginatedData | null = null;

  constructor(private renderer: Renderer2, private dataService: DataService) {
    this.dataService.tableData$.subscribe(data => {
      this.tableData = data;
    });
  }

  /** Triggers a CSV file download using the stored table data. */
  handleCSV(): void {
    if (this.tableData && this.tableData.pageData) {
      const content: string = this.convertToCSV(this.tableData.pageData);
      this.triggerDownload(content, "text/csv", "pg_broker.csv");
    }
  }

  /** Triggers a JSON file download using the stored table data. */
  handleJSON(): void {
    if (this.tableData && this.tableData.pageData) {
      const content: string = JSON.stringify(this.tableData, null, 2);
      this.triggerDownload(content, "application/json", "pg_broker.json");
    }
  }

  /**
   * Converts an array of data objects into CSV format.
   * @param data The array of data to convert into CSV.
   * @returns A string representing the data in CSV format.
   */
  private convertToCSV(data: any[]): string {
    // Extract header (keys of the first data item)
    const header: string[] = Object.keys(data[0]);

    // Map each row of data to CSV format
    const rows: string[] = data.map(item => {
      return header.map(fieldName => {
        const value = item[fieldName];
        return JSON.stringify(value, (key, value) => value === null ? "" : value);
      }).join(",");
    });

    // Join header and rows into a single CSV string
    return [header.join(","), ...rows].join("\r\n");
  }

  /**
   * Triggers the download of a file with the given content, MIME type, and filename.
   * @param content The content to be downloaded.
   * @param type The MIME type of the content.
   * @param filename The name of the file to be downloaded.
   */
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
