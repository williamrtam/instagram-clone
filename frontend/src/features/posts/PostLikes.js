import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp'
import FavoriteBorderSharpIcon from '@material-ui/icons/FavoriteBorderSharp'
import {IconButton} from '@material-ui/core'
import {red} from '@material-ui/core/colors'

import {likePost, unlikePost} from './postsSlice'

export const PostLikes = ({post}) => {
  const curUserId = useSelector((state) => state.auth.user.id)
  const isLikedStart = () => {
    if (post.likerIds.length > 0) {
      return post.likerIds.includes(curUserId)
    } else {
      return false
    }
  }
  const [isLiked, setIsLiked] = useState(isLikedStart)
  const dispatch = useDispatch()

  const handleLike = () => {
    dispatch(likePost({postId: post.id, userId: curUserId}))
    setIsLiked(true)
  }

  const handleUnlike = () => {
    dispatch(unlikePost({postId: post.id, userId: curUserId}))
    setIsLiked(false)
  }

  let icon
  if (isLiked) {
    icon = <FavoriteSharpIcon fontSize="large" style={{color: red[900]}} onClick={handleUnlike} />
  } else {
    icon = <FavoriteBorderSharpIcon fontSize="large" onClick={handleLike} />
  }
  return <IconButton className="post-likes__iconButton">{icon}</IconButton>
}
