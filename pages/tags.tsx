import {GetStaticPropsResult} from 'next';

import {getNotionApi} from '../api/notion';
import PageFrame, {PageTitle} from '../components/PageFrame';
import TagCard from '../components/TagCard';
import {DEFAULT_TIMEOUT_SEC} from '../utils/cache';

export interface TagProps {
  tags: TagStat[];
}

export interface TagStat {
  name: string;
  numPosts: number;
}

export default function Tags({tags}: TagProps) {
  return (
      <PageFrame title="Tags">
        <PageTitle>
          Tags
        </PageTitle>
        <div className="flex flex-wrap">
          {tags.map(tag => (
              <div key={tag.name} className="m-2">
                <TagCard name={tag.name} numPosts={tag.numPosts} />
              </div>
          ))}
        </div>
      </PageFrame>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<TagProps>> {
  const tagsCount = await getNotionApi().getTagDistribution();
  const tags: TagStat[] = [];
  tagsCount.forEach((numPosts, tag) => {
    tags.push({
      name: tag,
      numPosts,
    });
  });

  // Sort all tags so that tags which are attached to more posts are placed earlier in the resulting list.
  tags.sort((lhs, rhs) => rhs.numPosts - lhs.numPosts);

  return {
    props: {tags},
    revalidate: DEFAULT_TIMEOUT_SEC,
  };
}
