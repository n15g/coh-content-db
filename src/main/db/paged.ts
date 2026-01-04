export interface Paged<T> {
  items: T[]

  matchedItemCount: number
  totalItemCount: number

  pageSize?: number
  pageIndex: number
  pageNumber: number
  totalPageCount: number
}
