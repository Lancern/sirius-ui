import {PostTag} from '../data/models';
import Tag from "./Tag";

interface TagListProps {
  tags: PostTag[],
}

export default function TagList(props: TagListProps): JSX.Element {
  const tagBadges = props.tags.map(tag => (
    <div style={{display: 'inline'}} className="mr-2">
      <Tag key={tag.id} tag={tag} />
    </div>
  ));
  return (
    <div style={{display: 'inline'}}>
      {tagBadges}
    </div>
  );
}
