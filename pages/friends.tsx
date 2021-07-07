import {GetStaticPropsResult} from 'next';

import {getBlogConfig} from '../api/config';
import {getNotionApi} from '../api/notion';
import PageFrame, {PageTitle} from '../components/PageFrame';
import FriendCard from "../components/FriendCard";
import {Friend} from '../utils/blog';
import {DEFAULT_TIMEOUT_SEC} from '../utils/cache';

export interface FriendsProps {
  friends: Friend[],
}

export default function Friends({friends}: FriendsProps) {
  const blogConfig = getBlogConfig();

  return (
      <PageFrame title="Friends">
        <PageTitle>
          {blogConfig.owner.nickname}&apos;s Friends
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
    revalidate: DEFAULT_TIMEOUT_SEC,
  };
}
