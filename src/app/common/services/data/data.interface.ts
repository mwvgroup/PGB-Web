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
