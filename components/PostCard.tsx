import {CalendarIcon} from '@heroicons/react/outline';

import {Post} from '../api/notion';
import Card, {CardTitle, CardDescription} from './Card';
import Tag from './Tag';

export interface PostCardProps {
  post: Post;
}

export default function PostCard({post}: PostCardProps) {
  return (
      <Card>
        <div>
          <div className="inline-block mr-2">
            <Tag name={post.category} categoryTag />
          </div>
          {post.tags.map(tag => (
              <div key={tag} className="inline-block mx-0.5">
                <Tag name={tag} />
              </div>
          ))}
        </div>

        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.brief}</CardDescription>

        <div className="text-sm text-gray-400 flex flex-nowrap items-center space-x-2 overflow-hidden">
          <div className="flex items-center space-x-1">
            <CalendarIcon className="w-5 h-5" />
            <span className="flex-shrink-0">{new Date(post.creationDate).toLocaleDateString()}</span>
          </div>
          {post.authors.map(author => (
            <div key={author.id} className="flex items-center space-x-1 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-6 h-6 rounded-full" src={author.profilePhoto} alt="Author's Profile Avatar" />
              <span className="hidden md:block">{author.fullName}</span>
            </div>
          ))}
        </div>
      </Card>
  );
}
