import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Post } from "./Post";
import { selectPostIds, getPosts } from "./postsSlice";

import CircularProgress from '@material-ui/core/CircularProgress';


export const PostsList = () => {
  const dispatch = useDispatch()
  const orderedPostIds = useSelector(selectPostIds);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(getPosts());
    }
  }, [postStatus, dispatch]);

  let content

  if (postStatus === 'loading') {
    content = <div className="posts-list__progress"><CircularProgress /></div>
  } else if (postStatus === 'succeeded') {
    content = orderedPostIds.map((postId) => (
      <Post key={postId} postId={postId} />
    ))
  } else if (postStatus === 'error') {
    content = <div>{error}</div>
  }

  return (
    <>
      {content}
    </>
  )
}
