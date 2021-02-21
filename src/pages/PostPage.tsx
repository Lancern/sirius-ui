import React from 'react';
import {Alert, Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';

import PostView from '../components/PostView';

export default function PostPage(): JSX.Element {
  const { id } = useParams<{id: string}>();

  const idNum = parseInt(id);
  if (!Number.isInteger(idNum) || idNum <= 0) {
    return (
      <Alert variant="danger">
        "${id}" is not a valid post ID.
      </Alert>
    );
  }

  return (
    <Row>
      <Col>
        <PostView postId={idNum} tagUrlFactory={(tag: number) => `/tag/${tag}`} />
      </Col>
    </Row>
  );
}
