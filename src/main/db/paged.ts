export interface Paged<T> {
  items: T[]
  page: number
  pageSize?: number
  totalItems: number
  totalPages: number
}
