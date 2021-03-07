import {Card, CardDeck} from 'react-bootstrap';

import Tag from 'components/Tag';
import {PostTag} from 'data/models';

export interface TagListProps {
  tags: PostTag[],
}

export default function TagList(props: TagListProps): JSX.Element {
  const tagCards = props.tags.map(tag => (
    <Card key={tag.id} body>
      <Tag tag={tag} />
    </Card>
  ));
  return (
    <CardDeck>
      {tagCards}
    </CardDeck>
  );
}
