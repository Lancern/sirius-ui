import Tag from "components/Tag";
import {PostTag} from 'data/models';

export interface InlineTagListProps {
  tags: PostTag[],
}

export default function InlineTagList(props: InlineTagListProps): JSX.Element {
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
