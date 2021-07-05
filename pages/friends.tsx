import {Friend, getNotionApi} from '../api/notion';
import PageFrame from '../components/PageFrame';
import FriendCard from "../components/FriendCard";

export interface FriendsProps {
  friends: Friend[],
}

export default function Friends({friends}: FriendsProps) {
  return (
      <PageFrame title="Friends">
        <div className="font-bold text-2xl my-8 dark:text-white">
          Lancern&apos;s Friends
        </div>
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

export async function getStaticProps(): Promise<{props: FriendsProps}> {
  const friends = await getNotionApi().getFriendsList();
  return {
    props: {
      friends,
    },
  };
}
