import React, {useState} from 'react'
import {useSelector} from 'react-redux'

import FavoriteIcon from '@material-ui/icons/Favorite'
import ModeCommentIcon from '@material-ui/icons/ModeComment'
import {ViewPostModal} from './ViewPostModal'
import Dialog from '@material-ui/core/Dialog'

import {selectPostById} from './postsSlice'

export const PostsGridItem = ({postId}) => {
  const post = useSelector((state) => selectPostById(state, postId))
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="posts-grid-item" onClick={() => setIsOpen(true)}>
        <img src={post.image} className="posts-grid-item__image" alt="post image" />
        <div className="posts-grid-item__info">
          <div>
            <FavoriteIcon fontSize="large" />
            {post.likerIds.length}
          </div>
          <div>
            <ModeCommentIcon fontSize="large" />
            {post.comments.length}
          </div>
        </div>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} aria-labelledby="form-dialog-title">
        <ViewPostModal post={post} />
      </Dialog>
    </>
  )
}
