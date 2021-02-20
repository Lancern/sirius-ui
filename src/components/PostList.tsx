import {Component, ReactNode} from 'react';
import {Alert, Spinner} from 'react-bootstrap';
import {BsCalendar, BsExclamationTriangle, BsTag} from 'react-icons/all';

import api from '../data/api';
import {PaginatedPostList, Post, PostTag} from '../data/models';
import '../styles/post-list.css';
import Paginator from './Paginator';

interface TagProps {
  tag: PostTag;
}

class Tag extends Component<TagProps, any> {
  public constructor(props: TagProps) {
    super(props);
  }

  public render(): ReactNode {
    const {tag} = this.props;
    return (
      <span key={tag.name} className="tag mr-2 pl-1 pr-1 pt-2 pb-2">
        {tag.name}
      </span>
    );
  }
}

interface PostListItemProps {
  post: Post;
}

function PostListItem(props: PostListItemProps): JSX.Element {
  const {post} = props;

  let tagsRow: JSX.Element | undefined = undefined;
  if (post.tags.length > 0) {
    const tagBadges = post.tags.map(tag => (
      <Tag key={tag.id} tag={tag} />
    ));
    tagsRow = (
      <div className="text-muted">
        <span className="mr-1"><BsTag /></span>
        Tags: {tagBadges}
      </div>
    );
  }

  let truncatedContent: string;
  if (post.content.length > 100) {
    truncatedContent = post.content.substr(0, 97) + "...";
  } else {
    truncatedContent = post.content;
  }

  const createdAt = new Date(post.createdAt);
  const updatedAt = new Date(post.updatedAt);

  return (
    <div className="p-4 post-list-item">
      <h4>
        <span className="text-muted mr-2" style={{userSelect: 'none'}}>#{post.id}</span>
        {post.title}
      </h4>
      <div className="text-muted">
        <span className="mr-1"><BsCalendar /></span>
        Created at: {createdAt.toLocaleString()}
      </div>
      <div className="text-muted">
        <span className="mr-1"><BsCalendar /></span>
        Updated at: {updatedAt.toLocaleString()}
      </div>
      {tagsRow}
      <div className="pt-3 pb-3">
        {truncatedContent}
      </div>
      <div className="pb-2">
        <a href="">Read</a>
      </div>
    </div>
  );
}

interface PostListProps {
  page?: number;
  itemsPerPage?: number;
  searchTag?: string;

  onNavigateToPage?: (page: number) => void;
}

interface PostListState {
  data?: {
    posts: PaginatedPostList,
    page: number,
    itemsPerPage: number,
  }
  err?: any;
}

export default class PostList extends Component<PostListProps, PostListState> {
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

  public componentDidMount() {
    const page = this.props.page ?? 0;
    const itemsPerPage = this.props.itemsPerPage ?? 20;
    this.loadPosts(page, itemsPerPage);
  }

  public render(): ReactNode {
    if (this.state.data) {
      if (this.state.data.posts.count === 0) {
        return (
          <Alert variant="warning">No blog posts found</Alert>
        );
      } else {
        const maxPage = Math.ceil(this.state.data.posts.count / this.state.data.itemsPerPage) - 1;
        const postCards = this.state.data.posts.posts.map(post => (
          <PostListItem key={post.id} post={post} />
        ));
        const onNavigateToPage = this.props.onNavigateToPage ?? function () { };
        return (
          <div>
            <div className="post-list">
              {postCards}
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Paginator
                  currentPage={this.state.data.page}
                  maxPage={maxPage}
                  onNavigateToPage={page => onNavigateToPage(page)} />
            </div>
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
