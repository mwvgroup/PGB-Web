import { HttpHeaders, HttpParams } from "@angular/common/http";

/** Interface for optional values in an HTTP request. */
export interface RequestOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
}

/** Interface for application metadata as returned by the API. */
export interface AppMeta {
  name: string;
  version: string;
}

/** Schema map for a single database column as returned by the API. */
export interface SchemaColumn {
  type: string;
  nullable: boolean;
  default: string;
  primary_key: boolean;
}

/** Schema map for a single database table as returned by the API. */
export interface SchemaTable {
  columns: {
    [key: string]: SchemaColumn
  };
}

/** Schema map for the entire backend database as returned by the API. */
export interface Schema {
  tables: {
    [key: string]: SchemaTable
  };
}

