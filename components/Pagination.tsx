export interface PaginationProps {
  page: number;
  numPages: number;
  pageLink: (page: number) => string;
}

export default function Pagination(props: PaginationProps) {
  return (
      <div className="dark:text-white">
        {/* TODO: implement Pagination component */}
        This is pagination component
      </div>
  );
}
