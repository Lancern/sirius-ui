import {GetStaticPropsResult} from 'next';

import {getNotionApi} from '../api/notion';
import {Friend} from '../api/notion-blog-types';
import PageFrame, {PageTitle} from '../components/PageFrame';
import FriendCard from "../components/FriendCard";

export interface FriendsProps {
  friends: Friend[],
}

export default function Friends({friends}: FriendsProps) {
  return (
      <PageFrame title="Friends">
        <PageTitle>
          Lancern&apos;s Friends
        </PageTitle>
        <div className="flex flex-wrap justify-between">
          {friends.map(friend => (
              <div key={friend.id} className="my-2 mx-2 flex-auto flex-grow flex-shrink-0">
                <FriendCard friend={friend} />
              </div>
          ))}
        </div>
      </PageFrame>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<FriendsProps>> {
  const friends = await getNotionApi().getFriendsList();
  return {
    props: {
      friends,
    },
  };
}
