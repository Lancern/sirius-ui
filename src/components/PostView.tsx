import React from 'react';
import {Alert, Spinner} from 'react-bootstrap';
import {BsCalendar, BsExclamationTriangle, BsTag} from 'react-icons/all';

import api from '../data/api';
import {Post} from '../data/models';
import Markdown from './Markdown';
import TagList from "./TagList";

interface PostViewProps {
  postId: number;
}

interface PostViewState {
  data?: Post;
  err?: any;
}

export default class PostView extends React.Component<PostViewProps, PostViewState> {
  public constructor(props: PostViewProps) {
    super(props);
    this.state = {};
  }

  private loadPost() {
    api.getPost(this.props.postId)
        .then(post => {
          this.setState({
            data: post,
          });
        }, err => {
          console.log(`Error while loading post data: ${err}`);
          this.setState({err});
        });
  }

  public componentDidMount() {
    this.loadPost();
  }

  public render() {
    if (this.state.data) {
      const post = this.state.data;
      const createdAt = new Date(post.createdAt);
      const updatedAt = new Date(post.updatedAt);

      let tagsRow: JSX.Element | undefined = undefined;
      if (post.tags.length > 0) {
        tagsRow = (
          <div className="text-muted">
            <span className="mr-1"><BsTag /></span>
            Tags: <TagList tags={post.tags} />
          </div>
        );
      }

      return (
        <>
          <h2 className="pt-2 pb-2">
            <span className="text-muted mr-2" style={{userSelect: 'none'}}>#{post.id}</span>
            {post.title}
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
            {post.content}
          </Markdown>
        </>
      );
    } else if (this.state.err) {
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
}
