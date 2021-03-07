import {FormEvent, useState} from 'react';
import {Button, Col, Form, Modal, Row} from 'react-bootstrap';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css'

import {Post} from '../data/models';
import Markdown from './Markdown';
import Loading from "./Loading";

export interface PostEditorProps {
  post?: Post;
  onSubmit?: (title: string, tags: string[], isDraft: boolean, isTop: boolean, content: string) => Promise<void>;
}

export default function PostEditor(props: PostEditorProps): JSX.Element {
  const [title, setTitle] = useState<string>(props.post?.title ?? "");
  const [tags, setTags] = useState<string[]>(props.post?.tags?.map(tag => tag.name) ?? []);
  const [isDraft, setIsDraft] = useState<boolean>(props.post?.isDraft ?? false);
  const [isTop, setIsTop] = useState<boolean>(props.post?.isTop ?? false);
  const [content, setContent] = useState<string>(props.post?.content ?? "");

  const [selectedTab, setSelectedTab] = useState<'write' | 'preview' | undefined>('write');

  const [validated, setValidated] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [showMessageModal, setShowMessageModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleTagsChange = (tags: string) => {
    setTags(tags.split(','));
  };

  const generateMarkdownPreview = (markdown: string) => Promise.resolve(
    <Markdown sanitizeHtml={false}>
      {markdown}
    </Markdown>
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    if (!props.onSubmit) {
      return;
    }

    setSubmitting(true);
    props.onSubmit(title, tags, isDraft, isTop, content)
        .catch(err => {
          setMessage(`Submit data failed: ${err}`);
          setShowMessageModal(true);
        })
        .finally(() => {
          setSubmitting(false);
        });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Row} disabled={submitting}>
          <Form.Label column sm={1}>Title</Form.Label>
          <Col sm={11}>
            <Form.Control
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                style={{fontWeight: 'bold'}} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} disabled={submitting}>
          <Form.Label column sm={1}>Tags</Form.Label>
          <Col sm={11}>
            <Form.Control
                type="text"
                placeholder="Comma-separated tags list"
                value={tags.join(',')}
                onChange={e => handleTagsChange(e.target.value)} />
          </Col>
        </Form.Group>
        <Row>
          <Col sm={1} />
          <Col sm={11}>
            <Form.Check
                inline
                label="Top"
                type="checkbox"
                disabled={submitting}
                checked={isTop}
                onChange={e => setIsTop(e.target.checked)} />
            <Form.Check
                inline
                label="Draft"
                type="checkbox"
                disabled={submitting}
                checked={isDraft}
                onChange={e => setIsDraft(e.target.checked)} />
          </Col>
        </Row>
        <div className="mt-2 mb-2">
          {submitting
              ? (<Loading />)
              : (
                  <ReactMde
                      value={content}
                      onChange={setContent}
                      selectedTab={selectedTab}
                      onTabChange={tab => setSelectedTab(tab)}
                      generateMarkdownPreview={generateMarkdownPreview} />
              )}
        </div>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Modal show={showMessageModal} onHide={() => setShowMessageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMessageModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
