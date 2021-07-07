import {HashtagIcon, TagIcon} from '@heroicons/react/outline';
import Link from 'next/link';

import {getCategoryPath, getTagPath} from '../utils/blog';

export interface TagProps {
  name: string;
  categoryTag?: boolean;
}

const DEFAULT_CLASSES = "rounded mb-2 px-2 py-1 text-sm inline-block transition";

const NORMAL_TAG_COLOR_CLASSES = "text-blue-800 bg-blue-100 dark:bg-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-600";
const CATEGORY_TAG_COLOR_CLASSES = "text-green-800 bg-green-100 dark:text-green-100 dark:bg-green-800 hover:bg-green-300 dark:hover:bg-green-600";

export default function Tag({name, categoryTag}: TagProps) {
  const classNames = [DEFAULT_CLASSES];

  let icon: JSX.Element;
  if (categoryTag) {
    icon = (<HashtagIcon className="w-5 h-5" />)
    classNames.push(CATEGORY_TAG_COLOR_CLASSES);
  } else {
    icon = (<TagIcon className="w-5 h-5" />);
    classNames.push(NORMAL_TAG_COLOR_CLASSES);
  }

  let href: string;
  if (categoryTag) {
    href = getCategoryPath(name);
  } else {
    href = getTagPath(name);
  }

  return (
      <Link href={href} passHref>
        <a className={classNames.join(" ")}>
          <div className="flex items-center space-x-1">
            {icon}
            <span>{name}</span>
          </div>
        </a>
      </Link>
  );
}
