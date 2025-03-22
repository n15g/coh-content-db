export interface SearchResults<T> {
  value: T[]
  pageIndex: number
  pageSize?: number
  totalEntries: number
  totalPages: number
}
