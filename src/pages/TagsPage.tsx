import React from 'react';
import {Alert, Col, Row} from 'react-bootstrap';
import {BsExclamationTriangle} from 'react-icons/all';

import Loading from '../components/Loading';
import TagList from '../components/TagList';
import api from '../data/api';
import {PostTag} from '../data/models';

interface TagsPageState {
  data?: PostTag[],
  err?: any;
}

export default class TagsPage extends React.Component<any, TagsPageState> {
  public constructor() {
    super({});
    this.state = {};
  }

  private loadData() {
    api.getTags()
        .then(tags => {
          this.setState({
            data: tags,
          });
        }, err => {
          console.error(`Error while loading tags: ${err}`);
          this.setState({err});
        });
  }

  private renderContent(): JSX.Element {
    if (this.state.data) {
      return (
        <TagList tags={this.state.data} tagUrlFactory={(id: number) => `/tag/${id}`} />
      );
    } else if (this.state.err) {
      return (
        <Alert variant="danger">
          <span className="mr-1"><BsExclamationTriangle /></span>
          Loading tags failed
        </Alert>
      );
    } else {
      return (
        <Loading />
      );
    }
  }

  public componentDidMount() {
    this.loadData();
  }

  public render() {
    const content = this.renderContent();
    return (
      <Row>
        <Col>
          {content}
        </Col>
      </Row>
    );
  }
}
