import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {selectPostById} from './postsSlice'
import {Comment} from './Comment'

export const CommentsList = ({postId}) => {
  const post = useSelector((state) => selectPostById(state, postId))
  const comments = post.comments
  const [numComments, setNumComments] = useState(0)

  let content
  if (numComments !== comments.length) {
    content = comments.map((curComment) => <Comment key={curComment.id} comment={curComment} />)
  }

  return <>{content}</>
}
