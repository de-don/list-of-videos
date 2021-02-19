import { PaginationData } from './pagination-data';

/** List of items with pagination info */
export interface PagedList<T> {
  /** Id of the video */
  pagination: PaginationData;

  /** Items */
  items: T[];
}
