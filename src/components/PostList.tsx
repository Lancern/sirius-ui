import {Component, ReactNode} from 'react';
import {Alert, Card, Spinner} from 'react-bootstrap';
import {BsExclamationTriangle} from 'react-icons/all';

import api from '../data/api';
import {PaginatedPostList, Post, PostTag} from '../data/models';
import {RGBColor} from '../utils/color';
import {getStringHash} from '../utils/hash';
import CustomBadge from './CustomBadge';
import Paginator from './Paginator';

interface TagProps {
  tag: PostTag;
}

class Tag extends Component<TagProps, any> {
  public constructor(props: TagProps) {
    super(props);
  }

  private getBadgeColor(): RGBColor {
    const hash = getStringHash(this.props.tag.name);
    return new RGBColor(
        hash & 0xff,
        (hash & 0xff00) >> 8,
        (hash & 0xff0000) >> 16
    );
  }

  public render(): ReactNode {
    const badgeColor = this.getBadgeColor();
    return (
      <CustomBadge backgroundColor={badgeColor}>
        {this.props.tag.name}
      </CustomBadge>
    )
  }
}

interface PostListItemProps {
  post: Post;
}

function PostListItem(props: PostListItemProps): JSX.Element {
  const {post} = props;
  let tagsSubtitle: JSX.Element | undefined = undefined;
  if (post.tags.length > 0) {
    const tagBadges = post.tags.map(tag => (
        <Tag tag={tag} />
    ));
    tagsSubtitle = (
        <Card.Subtitle>
          Tags: {tagBadges}
        </Card.Subtitle>
    );
  }

  return (
      <Card body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Subtitle className="text-muted">
          Created at {post.createdAt}, last modified at {post.updatedAt}
        </Card.Subtitle>
        {tagsSubtitle}
        <Card.Text>
          {post.content}
        </Card.Text>
        <Card.Link>Read</Card.Link>
      </Card>
  );
}

interface PostListState {
  data?: {
    posts: PaginatedPostList,
    page: number,
    itemsPerPage: number,
  }
  err?: any;
}

export default class PostList extends Component<any, PostListState> {
  public constructor(props: any) {
    super(props);
    this.state = {};
  }

  private loadPosts(page: number, itemsPerPage: number) {
    api.getPosts({page, itemsPerPage})
        .then(data => {
          this.setState({
            data: {
              posts: data,
              page,
              itemsPerPage,
            },
          });
        }, err => {
          console.error(`Error while loading blog posts list: ${err}`);
          this.setState({err});
        });
  }

  private onNavigateToPage(page: number) {
    // TODO: Implement onNavigateToPage
  }

  public componentDidMount() {
    this.loadPosts(0, 20);
  }

  public render(): ReactNode {
    if (this.state.data) {
      if (this.state.data.posts.count === 0) {
        return (
          <Alert variant="warning">No blog posts found</Alert>
        );
      } else {
        const maxPage = Math.ceil(this.state.data.posts.count / this.state.data.itemsPerPage);
        const paginator = (
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Paginator
                currentPage={this.state.data.page}
                maxPage={maxPage}
                onNavigateToPage={page => this.onNavigateToPage(page)} />
          </div>
        );
        const postCards = this.state.data.posts.posts.map(post => (
          <PostListItem post={post} />
        ));
        return (
          <div>
            {paginator}
            <div>
              {postCards}
            </div>
            {paginator}
          </div>
        );
      }
    } else if (this.state.err) {
      return (
        <Alert variant="danger">
          <span className="mr-1"><BsExclamationTriangle /></span>
          Error loading blog posts list
        </Alert>
      )
    } else {
      return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Spinner animation="border" />
        </div>
      );
    }
  }
}
