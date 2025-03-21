export interface SearchResults<T> {
  value: T[]
  pageIndex: number
  pageSize: number | undefined
  total: number
}
