import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/outline';
import Link from 'next/link';
import {PropsWithChildren} from 'react';

export interface PaginationProps {
  page: number;
  numPages: number;
  itemsPerPage: number;
  totalItems: number;
  pageLink: (page: number) => string;
}

export default function Pagination(props: PaginationProps) {
  if (props.numPages < 0) {
    throw new Error("Invalid number of pages");
  }
  if (props.numPages === 0) {
    return <></>;
  }

  if (props.page <= 0 || props.page > props.numPages) {
    throw new Error("Invalid page number");
  }

  const createPrevButton = () => {
    let prevPageLink: string | undefined = undefined;
    if (props.page > 1) {
      prevPageLink = props.pageLink(props.page - 1);
    }
    return (
        <PaginationButton key="prev" position="left" href={prevPageLink}>
          <ChevronLeftIcon />
        </PaginationButton>
    );
  };

  const createNextButton = () => {
    let nextPageLink: string | undefined = undefined;
    if (props.page < props.numPages) {
      nextPageLink = props.pageLink(props.page + 1);
    }
    return (
        <PaginationButton key="next" position="right" href={nextPageLink}>
          <ChevronRightIcon />
        </PaginationButton>
    );
  };

  const createPageButtons = () => {
    const createPageButton = (page: number) => {
      const link = props.pageLink(page);
      return (
          <PaginationButton key={`page-${page}`} position="middle" href={link} active={page === props.page}>
            {page}
          </PaginationButton>
      );
    };

    const createEllipsesButton = (() => {
      let ellipsesId = 0;
      const getEllipsesId = () => {
        const id = ellipsesId;
        ++ellipsesId;
        return `ellipses-${id}`;
      };

      // eslint-disable-next-line react/display-name
      return () => (
          <PaginationButton key={getEllipsesId()} position="middle">
            ...
          </PaginationButton>
      );
    })();

    const showPages = [
        1, 2, 3,
        props.page - 1, props.page, props.page + 1,
        props.numPages - 2, props.numPages - 1, props.numPages
    ].filter(page => page >= 1 && page <= props.numPages)
        .sort((lhs, rhs) => lhs - rhs)
        .filter((page, index, array) => index === 0 || page !== array[index - 1]);

    const buttons = [];
    for (let i = 0; i < showPages.length; ++i) {
      const page = showPages[i];
      if (i > 0 && page - showPages[i - 1] > 1) {
        buttons.push(createEllipsesButton());
      }
      buttons.push(createPageButton(page));
    }

    return buttons;
  };

  const firstItemIndex = (props.page - 1) * props.itemsPerPage + 1;
  let lastItemIndex = props.page * props.itemsPerPage;
  if (lastItemIndex > props.totalItems) {
    lastItemIndex = props.totalItems;
  }

  return (
      <div className="w-full">
        <div className="flex justify-center sm:hidden">
          <nav className="flex">
            {createPrevButton()}
            {createNextButton()}
          </nav>
        </div>
        <div className="hidden sm:flex sm:justify-between">
          <div className="flex items-center text-sm text-gray-400 dark:text-gray-500">
            Showing {firstItemIndex} to {lastItemIndex} of {props.totalItems} item(s)
          </div>
          <nav className="flex">
            {createPrevButton()}
            {createPageButtons()}
            {createNextButton()}
          </nav>
        </div>
      </div>
  );
}

type PaginationButtonPosition = "left" | "middle" | "right";

interface PaginationButtonProps {
  position: PaginationButtonPosition;
  href?: string;
  active?: boolean;
}

type PaginationButtonKind = "static" | "link" | "active";

const PAGINATION_BUTTON_DEFAULT_CLASSES = "inline-flex justify-center items-center w-8 h-8 p-1 border-t-2 border-b-2";
const PAGINATION_BUTTON_POSITION_CLASSES = {
  left: "rounded-l-md border-l-2 border-r-1",
  middle: "border-l-1 border-r-1",
  right: "rounded-r-md border-l-1 border-r-2",
};
const PAGINATION_BUTTON_KIND_CLASSES = {
  static: "border-gray-200 dark:border-gray-700",
  link: "cursor-pointer border-gray-200 dark:border-gray-700 " +
      "hover:bg-gray-100 hover:border-gray-300 active:bg-gray-200 active:border-gray-400 " +
      "dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:active:bg-gray-600 dark:active:border-gray-500",
  active: "font-bold text-white bg-blue-600 border-blue-500 dark:bg-gray-700 dark:border-gray-600",
};

function PaginationButton(props: PropsWithChildren<PaginationButtonProps>) {
  const classNames = [
      PAGINATION_BUTTON_DEFAULT_CLASSES,
      PAGINATION_BUTTON_POSITION_CLASSES[props.position],
  ];

  let kind: PaginationButtonKind;
  if (props.active) {
    kind = "active";
  } else if (props.href !== undefined) {
    kind = "link";
  } else {
    kind = "static";
  }

  classNames.push(PAGINATION_BUTTON_KIND_CLASSES[kind]);

  switch (kind) {
    case "static":
    case "active":
      return (
          <div className={classNames.join(" ")}>
            {props.children}
          </div>
      );

    case "link":
      return (
          <Link href={props.href!} passHref>
            <a className={classNames.join(" ")}>
              {props.children}
            </a>
          </Link>
      )
  }
}
