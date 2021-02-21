import React from 'react';
import {Jumbotron} from 'react-bootstrap';
import {useParams} from 'react-router-dom';

import Loading from '../components/Loading';
import PostListWithPageRouter from '../components/PostListWithPageRouter';
import Slogan from '../components/Slogan';
import api from '../data/api';
import {PostTag} from '../data/models';

interface TagJumbotronProps {
  tagId: number;
}

interface TagJumbotronState {
  tag?: PostTag;
  err?: any;
}

class TagJumbotron extends React.Component<TagJumbotronProps, TagJumbotronState> {
  public constructor(props: TagJumbotronProps) {
    super(props);
    this.state = {};
  }

  private loadData() {
    api.getTag(this.props.tagId)
        .then(tag => {
          this.setState({tag});
        }, err => {
          console.error(`Error while loading tag: ${err}`);
          this.setState({err});
        });
  }

  public componentDidMount() {
    this.loadData();
  }

  public render() {
    if (this.state.tag) {
      return (
        <Jumbotron>
          <h2>
            <span style={{userSelect: 'none'}}>#</span>
            {this.state.tag.name}
          </h2>
        </Jumbotron>
      );
    } else if (this.state.err) {
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
