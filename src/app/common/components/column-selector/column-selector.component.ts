import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatOption, MatSelect } from "@angular/material/select";

import { DataService } from "~services/data/data.service";

@Component({
  selector: "app-column-selector",
  templateUrl: "column-selector.component.html",
  imports: [
    MatFormField,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
  ]
})
export class ColumnSelectorComponent implements OnInit {
  @Input() tableName!: string;
  @Output() selectionChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  protected columnList: string[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getColumnNames(this.tableName).subscribe(
      columns => this.columnList = columns
    );
  }
}
