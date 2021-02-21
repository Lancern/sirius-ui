import {PostTag} from '../data/models';
import '../styles/posts.css';

interface TagProps {
  tag: PostTag;
}

export default function Tag(props: TagProps): JSX.Element {
  return (
    <span className="tag pl-1 pr-1 pt-2 pb-2">
      {props.tag.name}
    </span>
  );
}