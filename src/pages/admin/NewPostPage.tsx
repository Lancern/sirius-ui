import {Col, Row} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

import PostEditor from '../../components/PostEditor';
import {useApi} from '../../context/api';
import {useAuth} from '../../context/auth';
import {useUrl} from '../../context/url';

export default function NewPostPage(): JSX.Element {
  const api = useApi();
  const auth = useAuth();
  const history = useHistory();
  const url = useUrl();

  const handleSubmit = (title: string, tags: string[], isDraft: boolean, isTop: boolean, content: string) => {
    tags = tags.map(t => t.trim());
    return api.sirius.admin(auth.token!).createPost({
      title, isTop, isDraft, tags, content,
    }).then(response => {
      if (!response.statusOk) {
        console.error(`Create post failed: server responses with ${response.status}`)
        throw new Error(`Server responses with ${response.status}`);
      }
      history.push(url.adminUrl);
    });
  };

  return (
    <Row className="justify-content-center">
      <Col>
        <PostEditor onSubmit={handleSubmit} />
      </Col>
    </Row>
  );
}
