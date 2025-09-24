interface IListRequestDTO {
  search?: string
  page?: number
  pageSize?: number
  rowsPerPage?: number
  order?: string
  filter?: string
}

export { IListRequestDTO }