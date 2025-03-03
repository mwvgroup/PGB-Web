import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";

import { DataService } from "~services/data/data.service";
import { SchemaService } from "~services/table/schema.service";
import { DatasetFormInterface } from "./dataset-form.interface";

/**
 * A form for selecting a dataset name from the application database.
 * Form options are automatically populated via the API and the selected table
 * name is emitted on form submit.
 */
@Component({
  selector: "app-dataset-form",
  templateUrl: "dataset-form.component.html",
  styleUrl: "dataset-form.component.scss",
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class DatasetFormComponent implements OnInit {
  @Output() formSubmit: EventEmitter<DatasetFormInterface> = new EventEmitter<DatasetFormInterface>();

  protected form!: FormGroup;
  protected allOptions: string[] = [];
  protected filteredOptions: string[] = [];

  constructor(private schemaService: SchemaService, private dataService: DataService) {}

  /** Loads valid table names and set up form controls. */
  ngOnInit(): void {
    this.initializeOptions();
    this.initializeFormControls();
  }

  /** Emits the selected table name if the form is valid. */
  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }

  /** Fetches valid table names from the API. */
  private initializeOptions(): void {
    this.schemaService.getTableNames().subscribe(
      names => {
        this.allOptions = names;
        this.filteredOptions = [...this.allOptions];
      },
      () => {
        this.allOptions = [];
        this.filteredOptions = [];
      }
    );
  }

  /** Initializes form controls with validation. */
  private initializeFormControls(): void {
    this.form = new FormGroup({
      tableName: new FormControl("", [Validators.required]),
    });

    this.form.get("tableName")!.valueChanges.subscribe((value: string) => {
      this.filteredOptions = this.filter(value || "");
    });
  }

  /**
   * Filters the available table names based on the provided input value.
   * The filter is case-insensitive and matches substrings of the table names.
   * @param value The input value to filter the table names by.
   * @returns A list of table names that match the filter criteria.
   */
  private filter(value: string): string[] {
    const filterValue: string = value.toLowerCase();
    return this.allOptions.filter((option: string) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
