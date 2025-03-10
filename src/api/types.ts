export interface PaginatedList<DTO> {
  first: number
  prev: number | null
  next: number | null
  last: number
  pages: number
  items: number
  data: DTO[]
}
