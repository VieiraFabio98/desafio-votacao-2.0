interface IListRequestDTO {
  search: string;
  page: number;
  rowsPerPage: number;
  order: string;
  filter?: string;
}

export { IListRequestDTO }