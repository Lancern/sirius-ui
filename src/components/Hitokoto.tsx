import {ReactNode, useEffect, useState} from 'react';
import {Alert, Card} from 'react-bootstrap';
import {BsExclamationTriangle} from 'react-icons/all';

import Icon from 'components/Icon';
import Loading from 'components/Loading';
import {useApi} from 'context/api';
import {HitokotoResponse} from 'data/hitokoto';

export default function Hitokoto(): JSX.Element {
  const [hitokoto, setHitokoto] = useState<HitokotoResponse>();
  const [err, setErr] = useState<any>();
  const api = useApi();

  useEffect(() => {
    api.hitokoto.getHitokoto()
        .then(response => setHitokoto(response))
        .catch(err => setErr(err));
  }, []);

  let content: ReactNode;
  if (hitokoto) {
    content = (
      <>
        <div>
          <blockquote className="blockquote mb-0">
            <p>
              {hitokoto.hitokoto}
            </p>
            <footer className="blockquote-footer">
              {hitokoto.from ?? hitokoto.creator}
            </footer>
          </blockquote>
        </div>
        <div className="mt-2">
          <a href={`https://hitokoto.cn?uuid=${hitokoto.uuid}`}>
            More
          </a>
        </div>
      </>
    );
  } else if (err) {
    content = (
      <Alert variant="danger">
        <Icon><BsExclamationTriangle /></Icon>
        Failed to load hitokoto
      </Alert>
    );
  } else {
    content = (<Loading />);
  }

  return (
    <Card>
      <Card.Header>Hitokoto · 一言</Card.Header>
      <Card.Body>
        {content}
      </Card.Body>
    </Card>
  );
}
