import Link from 'next/link';

import {HashtagIcon, TagIcon} from "@heroicons/react/outline";

export interface TagProps {
  name: string;
  categoryTag?: boolean;
  href?: string;
  externalHref?: boolean;
}

const DEFAULT_CLASSES = "rounded mb-2 px-2 py-1 text-sm inline-block";
const LINK_TAG_CLASSES = "transition";

const NORMAL_TAG_COLOR_CLASSES = "text-blue-800 bg-blue-100 dark:bg-blue-800 dark:text-blue-200";
const NORMAL_LINK_TAG_COLOR_CLASSES = "hover:bg-blue-200 dark:hover:bg-blue-600";
const CATEGORY_TAG_COLOR_CLASSES = "text-green-800 bg-green-100 dark:text-green-100 dark:bg-green-800";
const CATEGORY_LINK_TAG_COLOR_CLASSES = "hover:bg-green-300 dark:hover:bg-green-600";

export default function Tag({name, categoryTag, href, externalHref}: TagProps) {
  const classNames = [DEFAULT_CLASSES];
  if (href) {
    classNames.push(LINK_TAG_CLASSES);
  }

  let icon: JSX.Element;
  if (categoryTag) {
    icon = (<HashtagIcon className="w-5 h-5" />)
    classNames.push(CATEGORY_TAG_COLOR_CLASSES);
    if (href) {
      classNames.push(CATEGORY_LINK_TAG_COLOR_CLASSES);
    }
  } else {
    icon = (<TagIcon className="w-5 h-5" />);
    classNames.push(NORMAL_TAG_COLOR_CLASSES);
    if (href) {
      classNames.push(NORMAL_LINK_TAG_COLOR_CLASSES);
    }
  }

  if (href) {
    if (externalHref) {
      return (
          <a className={classNames.join(" ")} href={href} target="_blank" rel="noopener noreferrer">
            <div className="flex items-center space-x-1">
              {icon}
              <span>{name}</span>
            </div>
          </a>
      )
    } else {
      return (
          <Link href="" passHref>
            <div className={classNames.join(" ")}>
              <div className="flex items-center space-x-1">
                {icon}
                <span>{name}</span>
              </div>
            </div>
          </Link>
      );
    }
  } else {
    return (
        <div className={classNames.join(" ")}>
          <div className="flex items-center space-x-1">
            {icon}
            <span>{name}</span>
          </div>
        </div>
    );
  }
}
