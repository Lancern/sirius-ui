import {Friend} from '../utils/blog';
import Card, {CardTitle, CardDescription} from './Card';

export interface FriendCardProps {
  friend: Friend;
}

export default function FriendCard({friend}: FriendCardProps) {
  return (
      <Card className="cursor-pointer" href={friend.link} externalHref>
        <div className="flex">
          <div className="mr-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-16 h-16 rounded-full" src={friend.avatarUrl} alt="Avatar" />
          </div>
          <div>
            <CardTitle>{friend.name}</CardTitle>
            <CardDescription>{friend.brief}</CardDescription>
          </div>
        </div>
      </Card>
  );
}
