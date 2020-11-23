import React from 'react'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

import {PostLikedBy} from './PostLikedBy'
import {selectUserById} from '../users/usersSlice'
import {PostHeader} from './PostHeader'
import {NewComment} from './NewComment'
import {CommentsList} from './CommentsList'
import {PostLikes} from './PostLikes'
import {selectPostById} from './postsSlice'

export const Post = ({postId}) => {
  const history = useHistory()
  const post = useSelector((state) => selectPostById(state, postId))
  const postCreator = useSelector((state) => selectUserById(state, post.userId))
  const curUserId = useSelector((state) => state.auth.user.id)

  const toUserPage = () => {
    history.push(`/${postCreator.username}`, {userId: postCreator.id})
  }
  let postLikedBy = ''
  if (post.likerIds.length > 0) {
    postLikedBy = <PostLikedBy likerIds={post.likerIds} />
  }

  return (
    <div className="post">
      <PostHeader userId={post.userId} />
      <div className="post__imageContainer">
        <img className="post__image" alt="post image" src={post.image} />
      </div>
      <div className="post-likes__container">
        <PostLikes post={post} />
        {postLikedBy}
      </div>
      <div className="comment__text">
        <div className="post__captionContainer">
          <span className="post__userCaption" onClick={toUserPage}>
            <strong>{postCreator.username}</strong>
          </span>{' '}
          {post.caption}
        </div>
        <CommentsList postId={postId} />
      </div>
      <NewComment postId={postId} userId={curUserId} />
    </div>
  )
}
