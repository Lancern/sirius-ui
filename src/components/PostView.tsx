import {useEffect, useState} from 'react';
import {Alert, Spinner} from 'react-bootstrap';
import {BsCalendar, BsExclamationTriangle, BsTag} from 'react-icons/all';

import {useApi} from '../context/api';
import {Post} from '../data/models';
import InlineTagList from './InlineTagList';
import Markdown from './Markdown';

export interface PostViewProps {
  postId: number;
}

export default function PostView(props: PostViewProps): JSX.Element {
  const [data, setData] = useState<Post>();
  const [err, setErr] = useState<any>();
  const apiContext = useApi();

  useEffect(() => {
    apiContext.sirius.getPost(props.postId)
        .then(post => {
          setData(post);
        }, err => {
          console.log(`Error while loading post data: ${err}`);
          setErr(err);
        });
  }, [props.postId]);

  if (data) {
    const createdAt = new Date(data.createdAt);
    const updatedAt = new Date(data.updatedAt);

    let tagsRow: JSX.Element | undefined = undefined;
    if (data.tags.length > 0) {
      tagsRow = (
        <div className="text-muted">
          <span className="mr-1"><BsTag /></span>
          Tags: <InlineTagList tags={data.tags} />
        </div>
      );
    }

    return (
      <>
        <h2 className="pt-2 pb-2">
          <span className="text-muted mr-2" style={{userSelect: 'none'}}>#{data.id}</span>
          {data.title}
        </h2>
        <div className="text-muted">
          <span className="mr-1"><BsCalendar /></span>
          Created at: {createdAt.toLocaleString()}
        </div>
        <div className="text-muted">
          <span className="mr-1"><BsCalendar /></span>
          Updated at: {updatedAt.toLocaleString()}
        </div>
        {tagsRow}

        <hr />

        <Markdown>
          {data.content}
        </Markdown>
      </>
    );
  } else if (err) {
    return (
      <Alert variant="danger">
        <span className="mr-1"><BsExclamationTriangle /></span>
        Loading post view failed
      </Alert>
    );
  } else {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Spinner animation="border" />
      </div>
    );
  }
}
