import {Link} from 'react-router-dom';

import {PostTag} from '../data/models';
import '../styles/posts.css';

interface TagProps {
  tag: PostTag;

  tagUrlFactory?: (id: number) => string;
}

export default function Tag(props: TagProps): JSX.Element {
  if (props.tagUrlFactory) {
    const url = props.tagUrlFactory(props.tag.id);
    return (
      <span className="tag pl-1 pr-1 pt-2 pb-2">
        <Link to={url}>
          {props.tag.name}
        </Link>
      </span>
    );
  } else {
    return (
      <span className="tag pl-1 pr-1 pt-2 pb-2">
        {props.tag.name}
      </span>
    );
  }
}