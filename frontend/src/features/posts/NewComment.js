import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {nanoid} from '@reduxjs/toolkit'

import {addComment} from './postsSlice'

export const NewComment = ({postId, userId}) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleComment = async (e) => {
    e.preventDefault()
    try {
      const newComment = {postId: postId, userId: userId, content: comment, id: nanoid()}
      dispatch(addComment(newComment))
      setComment('')
    } catch (err) {
      console.error('Failed to save the comment: ', err)
    }
  }

  return (
    <form className="new-comment">
      <input
        className="new-comment__input"
        type="text"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="new-comment__Button"
        disabled={!comment}
        type="submit"
        onClick={handleComment}
      >
        Post
      </button>
    </form>
  )
}
