import {Link} from 'react-router-dom';

import {useUrl} from '../context/url';
import {PostTag} from '../data/models';
import '../styles/posts.css';

export interface TagProps {
  tag: PostTag;
}

export default function Tag(props: TagProps): JSX.Element {
  const url = useUrl();

  const tagUrl = url.getTagUrl(props.tag.id);
  return (
    <span className="tag pl-1 pr-1 pt-2 pb-2">
      <Link to={tagUrl}>
        {props.tag.name}
      </Link>
    </span>
  );
}
