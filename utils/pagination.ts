export interface PaginateOptions {
  page: number;
  itemsPerPage: number;
}

export default function paginate<T>(list: T[], options: PaginateOptions): T[] {
  if (options.page <= 0) {
    throw new Error("Invalid page number");
  }
  if (options.itemsPerPage <= 0) {
    throw new Error("Invalid items per page");
  }

  const firstIndex = (options.page - 1) * options.itemsPerPage;
  let endIndex = firstIndex + options.itemsPerPage;

  if (firstIndex >= list.length) {
    return [];
  }
  if (endIndex > list.length) {
    endIndex = list.length;
  }

  return list.slice(firstIndex, endIndex);
}

export function getNumPages(listLength: number, itemsPerPage: number): number {
  if (listLength < 0) {
    throw new Error("Invalid list length");
  }
  if (itemsPerPage <= 0) {
    throw new Error("Invalid items per page");
  }

  return Math.ceil(listLength / itemsPerPage);
}

export const DEFAULT_ITEMS_PER_PAGE = 20;
