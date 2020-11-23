import React from 'react'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

import {UserAvatar} from '../users/UserAvatar'
import {selectUserById} from '../users/usersSlice'

export const PostHeader = ({userId}) => {
  const history = useHistory()
  const user = useSelector((state) => selectUserById(state, userId))

  const toUserPage = () => {
    history.push(`/${user.username}`, {userId: userId})
  }

  return (
    <header className="post__header">
      <UserAvatar userId={userId} size="medium" />
      <h3 onClick={toUserPage}>{user.username}</h3>
    </header>
  )
}
