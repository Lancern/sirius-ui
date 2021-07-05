import Link from 'next/link';
import {PropsWithChildren} from 'react';

export interface CardProps {
  className?: string;
  href?: string;
  externalHref?: boolean;
  compact?: boolean;
}

const DEFAULT_CLASS_NAMES = "border-2 border-gray-100 bg-white rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white";
const LINK_CARD_CLASS_NAMES = "transition hover:border-blue-400 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700";
const COMPACT_CLASS_NAMES = "p-1 sm:p-2";
const NON_COMPACT_CLASS_NAMES = "p-4 sm:p-6";

export default function Card({className, children, compact, externalHref, href}: PropsWithChildren<CardProps>) {
  const classNames = [DEFAULT_CLASS_NAMES];

  if (compact) {
    classNames.push(COMPACT_CLASS_NAMES);
  } else {
    classNames.push(NON_COMPACT_CLASS_NAMES);
  }

  if (href) {
    classNames.push(LINK_CARD_CLASS_NAMES);
  }
  if (className) {
    classNames.push(className);
  }

  if (href) {
    if (externalHref) {
      return (
          <a
              className={`block cursor-pointer ${classNames.join(" ")}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
          >
            {children}
          </a>
      );
    } else {
      return (
          <Link href={href} passHref>
            <a className={`block cursor-pointer ${classNames.join(" ")}`}>
              {children}
            </a>
          </Link>
      );
    }
  } else {
    return (
        <div className={classNames.join(" ")}>
          {children}
        </div>
    );
  }
}

export function CardTitle({children}: PropsWithChildren<{}>) {
  return (
      <div className="font-bold text-xl mb-1">
        {children}
      </div>
  );
}

export function CardDescription({children}: PropsWithChildren<{}>) {
  return (
      <div className="text-sm text-gray-400 mb-2">
        {children}
      </div>
  );
}
