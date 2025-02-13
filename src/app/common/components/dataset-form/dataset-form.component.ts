import { AsyncPipe } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

import { DataService } from "~services/data/data.service";
import { DatasetFormInterface } from "./dataset-form.interface";

/**
 * A form for selecting a dataset name from the application database.
 * Form options are automatically populated via the API.
 * The selected table name is emitted on form submit.
 */
@Component({
  selector: "app-dataset-form",
  templateUrl: "dataset-form.component.html",
  styleUrl: "dataset-form.component.scss",
  imports: [
    AsyncPipe,
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
  protected filteredOptions$!: Observable<string[]>;

  constructor(private dataService: DataService) {}

  /** Loads valid table names and set up form controls. */
  ngOnInit(): void {
    this.initializeOptions();
    this.initializeFormControls();
    this.initializeAutocomplete();
  }

  /** Emits the selected table name if the form is valid. */
  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }

  /** Fetches valid table names from the API. */
  private initializeOptions(): void {
    this.dataService.getTableNames().subscribe(names => this.allOptions = names);
  }

  /** Initializes form controls with validation. */
  private initializeFormControls(): void {
    const escapedArr: string[] = this.allOptions.map(item => item.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"));
    const regexPattern: string = escapedArr.join("|");
    const regex = new RegExp(`^(${regexPattern})$`);

    this.form = new FormGroup({
      datasetName: new FormControl("", [Validators.required, Validators.pattern(regex)]),
    });
  }

  /** Initializes the autocomplete functionality for form controls. */
  private initializeAutocomplete(): void {
    this.filteredOptions$ = this.form.get("tableName")!.valueChanges.pipe(
      startWith(""),
      map(value => this.filter(value || ""))
    );
  }

  /**
   * Filters the available table names based on the provided input value.
   * The filter is case-insensitive and matches substrings of the table names.
   * @param value The input value to filter the table names by.
   * @returns A list of table names that match the filter criteria.
   */
  private filter(value: string): string[] {
    const filterValue: string = value.toLowerCase();
    return this.allOptions.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
