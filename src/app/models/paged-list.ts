/** List of items with pagination info */
export interface PagedList<T> {
  /** Token for next page */
  nextPageToken?: string;

  /** Token for previous page */
  prevPageToken?: string;

  /** Items */
  items: T[];
}
