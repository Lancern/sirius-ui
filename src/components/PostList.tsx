import {useEffect, useState} from 'react';
import {BsArrowBarUp, BsCalendar, BsTag} from 'react-icons/all';
import {Link} from 'react-router-dom';

import {useApi} from '../context/api';
import {PaginatedPostList, Post} from '../data/models';
import '../styles/posts.css';
import InlineTagList from './InlineTagList';
import Loading from './Loading';
import Paginator from './Paginator';
import Slogan from "./Slogan";
import {Badge} from "react-bootstrap";

export interface PostListItemProps {
  post: Post;

  postUrlFactory: (post: number) => string;
  tagUrlFactory: (tag: number) => string;
}

function PostListItem(props: PostListItemProps): JSX.Element {
  const {post} = props;

  let topMark: JSX.Element | undefined = undefined;
  if (post.isTop) {
    topMark = (
      <Badge className="ml-2" variant="primary">
        <span className="mr-1"><BsArrowBarUp /></span>
        Top
      </Badge>
    );
  }

  let tagsRow: JSX.Element | undefined = undefined;
  if (post.tags.length > 0) {
    tagsRow = (
      <div className="text-muted">
        <span className="mr-1"><BsTag /></span>
        Tags: <InlineTagList tags={post.tags} tagUrlFactory={props.tagUrlFactory} />
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
  const postUrl = props.postUrlFactory(props.post.id);

  return (
    <div className={`p-4 post-list-item ${post.isTop ? 'top' : ''}`}>
      <h4>
        <span className="text-muted mr-2" style={{userSelect: 'none'}}>#{post.id}</span>
        {post.title}
        {topMark}
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
        <Link to={postUrl}>Read</Link>
      </div>
    </div>
  );
}

export interface PostListProps {
  page?: number;
  itemsPerPage?: number;
  searchTag?: number;

  pageUrlFactory: (page: number) => string;
  postUrlFactory: (post: number) => string;
  tagUrlFactory: (tag: number) => string;
}

export default function PostList(props: PostListProps): JSX.Element {
  const [data, setData] = useState<{
    posts: PaginatedPostList,
    page: number,
    itemsPerPage: number,
  }>();
  const [err, setErr] = useState<any>();
  const apiContext = useApi();

  useEffect(() => {
    const page = props.page ?? 0;
    const itemsPerPage = props.itemsPerPage ?? 20;

    const filter = {page, itemsPerPage};
    if (props.searchTag) {
      Object.defineProperty(filter, 'tags', {
        writable: true,
        enumerable: true,
        value: [props.searchTag],
      });
    }

    apiContext.sirius.getPosts(filter)
        .then(data => {
          setData({
            posts: data,
            page,
            itemsPerPage,
          });
        }, err => {
          console.error(`Error while loading blog posts list: ${err}`);
          setErr(err);
        });
  }, [props.page, props.itemsPerPage, props.searchTag]);

  if (data) {
    if (data.posts.count === 0) {
      return (
        <Slogan variant="warning">No blog posts found.</Slogan>
      );
    } else {
      const maxPage = Math.ceil(data.posts.count / data.itemsPerPage) - 1;
      const postCards = data.posts.posts.map(post => (
        <PostListItem
            key={post.id}
            post={post}
            postUrlFactory={props.postUrlFactory}
            tagUrlFactory={props.tagUrlFactory} />
      ));
      return (
        <div>
          <div className="post-list">
            {postCards}
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Paginator
                currentPage={data.page}
                maxPage={maxPage}
                pageUrlFactory={props.pageUrlFactory} />
          </div>
        </div>
      );
    }
  } else if (err) {
    return (
      <Slogan variant="error">
        Loading blog posts list failed.
      </Slogan>
    );
  } else {
    return (
      <Loading />
    );
  }
}
