import React from 'react'
import {useSelector} from 'react-redux'

import {selectPostsByUser} from '../posts/postsSlice'
import {PostsGridItem} from './PostsGridItem'

export const PostsGrid = ({userId}) => {
  const userPosts = useSelector((state) => selectPostsByUser(state, userId))
  const postImages = userPosts.map((post) => <PostsGridItem key={post.id} postId={post.id} />)

  return (
    <div className="posts-grid__container">
      <div className="posts-grid">{postImages}</div>
    </div>
  )
}
