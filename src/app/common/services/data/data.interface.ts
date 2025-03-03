export interface PaginatedOptions {
  pageIndex?: number;
  pageSize?: number;
  orderBy?: string;
  direction?: string;
}

export interface PaginatedData {
  pageData: any;
  tableLength: number;
}
