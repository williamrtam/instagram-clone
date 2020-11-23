import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import DialogContent from '@material-ui/core/DialogContent'

import {PostHeader} from './PostHeader'
import {selectPostById} from './postsSlice'
import {CommentsList} from './CommentsList'
import {NewComment} from './NewComment'
import {PostLikes} from './PostLikes'
import {PostLikedBy} from './PostLikedBy'


export const ViewPostModal= ({post}) => {
  const curUserId = useSelector(state => state.auth.user.id)
  let postLikedBy = ''
  if (post.likerIds.length > 0) {
    postLikedBy = <PostLikedBy likerIds={post.likerIds} />
  }
  return (
    <DialogContent className="view-post-modal">
      <div className="view-post-modal__imageContainer">
        <img className="post__image" alt="post image" src={post.image} />
      </div>
    <div className="view-post-modal__textContainer">
      <div className="view-post-modal__avatar">
        <PostHeader className="view-post-modal__header" userId={post.userId} />
      </div>
      <div className="view-post-modal__comments">
        <CommentsList postId={post.id} />
      </div>
      <div className="view-post-modal__likesContainer">
        <PostLikes post={post} />
        {postLikedBy}
      </div>
      <div className="view-post-modal__newComment">
        <NewComment postId={post.id} userId={curUserId}/>
      </div>
    </div>
    </DialogContent>
    )
}
