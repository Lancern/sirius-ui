import React from 'react';
import {Alert, Spinner} from 'react-bootstrap';
import {BsExclamationTriangle} from 'react-icons/all';

import api from '../data/api';
import {Post} from '../data/models';

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
      // TODO: Implement PostView component.
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
