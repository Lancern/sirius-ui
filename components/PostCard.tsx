import {CalendarIcon} from '@heroicons/react/outline';

import {Post} from '../api/notion';
import Tag from './Tag';

export interface PostCardProps {
  post: Post;
}

export default function PostCard({post}: PostCardProps) {
  return (
      <a className="p-4 sm:p-6 border-2 border-gray-100 bg-white rounded-md transition cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:text-white hover:border-blue-400 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700">
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

        <div className="font-bold text-xl mb-1">{post.title}</div>
        <div className="text-sm text-gray-400 mb-2">{post.brief}</div>

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
      </a>
  );
}
