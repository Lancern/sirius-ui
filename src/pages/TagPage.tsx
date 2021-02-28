import {useEffect, useState} from 'react';
import {Jumbotron} from 'react-bootstrap';
import {useParams} from 'react-router-dom';

import Loading from '../components/Loading';
import PostListWithPageRouter from '../components/PostListWithPageRouter';
import Slogan from '../components/Slogan';
import {useApi} from '../context/api';
import {PostTag} from '../data/models';

interface TagJumbotronProps {
  tagId: number;
}

function TagJumbotron(props: TagJumbotronProps): JSX.Element {
  const [tag, setTag] = useState<PostTag>();
  const [err, setErr] = useState<any>();
  const apiContext = useApi();

  useEffect(() => {
    apiContext.sirius.getTag(props.tagId)
        .then(tag => {
          setTag(tag);
        }, err => {
          console.error(`Error while loading tag: ${err}`);
          setErr(err);
        });
  }, [props.tagId]);

  if (tag) {
    return (
      <Jumbotron>
        <h2>
          <span style={{userSelect: 'none'}}>#</span>
          {tag.name}
        </h2>
      </Jumbotron>
    );
  } else if (err) {
    return (
      <Slogan variant="error">
        Loading tag failed
      </Slogan>
    );
  } else {
    return (
      <Loading />
    );
  }
}

export default function TagPage(): JSX.Element {
  const {id} = useParams<{id: string}>();

  const idNum = parseInt(id);
  if (!Number.isInteger(idNum)) {
    return (
      <Slogan variant="error">
        {`${id} is not a valid tag ID.`}
      </Slogan>
    );
  }

  return (
    <>
      <TagJumbotron tagId={idNum} />
      <PostListWithPageRouter
          searchTag={idNum}
          postUrlFactory={(post: number) => `/post/${post}`}
          tagUrlFactory={(tag: number) => `/tag/${tag}`} />
    </>
  );
}
