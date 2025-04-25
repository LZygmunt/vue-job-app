export interface PaginatedList<DTO> {
  totalCount: number
  page: number
  totalPages: number
  data: DTO[]
}
