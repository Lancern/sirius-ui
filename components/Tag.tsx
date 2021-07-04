import Link from 'next/link';

import {HashtagIcon, TagIcon} from "@heroicons/react/outline";

export interface TagProps {
  name: string;
  categoryTag?: boolean;
}

export default function Tag({name, categoryTag}: TagProps) {
  let icon: JSX.Element;
  let colorClasses: string;
  if (categoryTag) {
    icon = (<HashtagIcon className="w-5 h-5" />)
    colorClasses = "text-green-800 bg-green-100 hover:bg-green-300 dark:text-green-100 dark:bg-green-800 dark:hover:bg-green-600";
  } else {
    icon = (<TagIcon className="w-5 h-5" />);
    colorClasses = "text-blue-800 bg-blue-100 dark:text-blue-200 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-600";
  }

  return (
      <Link href="" passHref>
        <div className={`rounded mb-2 px-2 py-1 text-sm transition inline-block ${colorClasses}`}>
          <div className="flex items-center space-x-1">
            {icon}
            <span>{name}</span>
          </div>
        </div>
      </Link>
  );
}
