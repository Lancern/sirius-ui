import {GetStaticPropsResult} from 'next';

import {getNotionApi} from '../api/notion';
import PageFrame, {PageTitle} from '../components/PageFrame';
import TagCard from '../components/TagCard';
import {DEFAULT_TIMEOUT_SEC} from '../utils/cache';

export interface CategoriesProps {
  categories: CategoryStat[];
}

export interface CategoryStat {
  name: string;
  numPosts: number;
}

export default function Categories({categories}: CategoriesProps) {
  return (
      <PageFrame title="Categories">
        <PageTitle>Categories</PageTitle>
        <div className="flex flex-wrap">
          {categories.map(category => (
              <div key={category.name} className="m-2">
                <TagCard name={category.name} numPosts={category.numPosts} isCategory />
              </div>
          ))}
        </div>
      </PageFrame>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<CategoriesProps>> {
  const categoriesCount = await getNotionApi().getCategoryDistribution();
  const categories: CategoryStat[] = [];
  categoriesCount.forEach((numPosts, name) => {
    categories.push({name, numPosts});
  });

  return {
    props: {categories},
    revalidate: DEFAULT_TIMEOUT_SEC,
  };
}
