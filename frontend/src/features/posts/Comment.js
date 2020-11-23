import React from 'react'
import {selectUserById} from '../users/usersSlice'
import {useSelector} from 'react-redux'
import {useHistory, useLocation} from 'react-router-dom'

import {UserAvatar} from '../users/UserAvatar'

export const Comment = ({comment}) => {
  const history = useHistory()
  const location = useLocation()
  const user = useSelector((state) => selectUserById(state, comment.userId))
  let content = ''

  const toUserPage = () => {
    history.push(`/${user.username}`, {userId: user.id})
  }

  if (location.pathname !== '/') {
    content = <UserAvatar userId={user.id} size="small" />
  }

  return (
    <div className="comment__container">
      {content}
      <span className="comment__username" onClick={toUserPage}>
        <strong>{user.username}</strong>
      </span>{' '}
      {comment.content}
    </div>
  )
}
