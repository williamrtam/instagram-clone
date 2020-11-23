import React from 'react'
import {useSelector} from 'react-redux'

import {selectPostById} from './postsSlice'

export const PostImage = ({postId}) => {
  const post = useSelector((state) => selectPostById(state, postId))
  return (
    <div>
      <img className="post__image" alt="post image" src={post.image} />
    </div>
  )
}
