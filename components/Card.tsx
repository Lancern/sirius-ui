import Link from 'next/link';
import {PropsWithChildren} from 'react';

export interface CardProps {
  className?: string;
  href?: string;
  externalHref?: boolean;
}

const DEFAULT_CLASS_NAMES = "p-4 sm:p-6 border-2 border-gray-100 bg-white rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white";
const LINK_CARD_CLASS_NAMES = "transition hover:border-blue-400 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700";

export default function Card({className, children, externalHref, href}: PropsWithChildren<CardProps>) {
  let classNames = DEFAULT_CLASS_NAMES;
  if (href) {
    classNames += ` ${LINK_CARD_CLASS_NAMES}`;
  }
  if (className) {
    classNames += ` ${className}`;
  }

  if (href) {
    if (externalHref) {
      return (
          <a
              className={`block cursor-pointer ${classNames}`}
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
            <div className={`cursor-pointer ${classNames}`}>
              {children}
            </div>
          </Link>
      );
    }
  } else {
    return (
        <div className={classNames}>
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
