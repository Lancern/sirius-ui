import {useEffect, useState} from 'react';
import {Alert, Col, Jumbotron, Row} from 'react-bootstrap';
import {BsExclamationTriangle} from 'react-icons/all';

import Loading from '../components/Loading';
import TagList from '../components/TagList';
import {useApi} from '../context/api';
import {PostTag} from '../data/models';

export default function TagsPage(): JSX.Element {
  const [data, setData] = useState<PostTag[]>();
  const [err, setErr] = useState<any>();
  const apiContext = useApi();

  useEffect(() => {
    apiContext.sirius.getTags()
        .then(tags => {
          setData(tags);
        }, err => {
          console.error(`Error while loading tags: ${err}`);
          setErr(err);
        });
  });

  let content: JSX.Element;
  if (data) {
    content = (
      <TagList tags={data} tagUrlFactory={(id: number) => `/tag/${id}`} />
    );
  } else if (err) {
    content = (
      <Alert variant="danger">
        <span className="mr-1"><BsExclamationTriangle /></span>
        Loading tags failed
      </Alert>
    );
  } else {
    content = (
      <Loading />
    );
  }

  return (
    <Row>
      <Col>
        <Jumbotron>
          <h1>Tags</h1>
          <p>
            All tags are listed here
          </p>
        </Jumbotron>
        {content}
      </Col>
    </Row>
  );
}
