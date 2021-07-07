import {HashtagIcon, TagIcon} from '@heroicons/react/outline';

import Card, {CardDescription, CardTitle} from './Card';
import {getCategoryPath, getTagPath} from '../utils/blog';

export interface TagCardProps {
  name: string;
  numPosts: number;
  isCategory?: boolean;
}

export default function TagCard({name, numPosts, isCategory}: TagCardProps) {
  let icon: JSX.Element;
  let href: string;
  if (isCategory) {
    icon = (<HashtagIcon />)
    href = getCategoryPath(name);
  } else {
    icon = (<TagIcon />);
    href = getTagPath(name);
  }

  return (
      <Card href={href}>
        <div className="flex dark:text-white">
          <div className="w-16 h-16 mr-2">
            {icon}
          </div>
          <div>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{numPosts} post(s)</CardDescription>
          </div>
        </div>
      </Card>
  );
}
