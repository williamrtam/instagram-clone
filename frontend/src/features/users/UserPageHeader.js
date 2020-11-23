import React from 'react'
import {useSelector} from 'react-redux'

import {selectPostsByUser} from '../posts/postsSlice'
import {selectUserById} from './usersSlice'
import {UserAvatar} from './UserAvatar'
import {NewPostModal} from '../posts/NewPostModal'
import {EditProfile} from './EditProfile'

export const UserPageHeader = ({userId}) => {
  const numPosts = useSelector((state) => selectPostsByUser(state, userId)).length
  const user = useSelector((state) => selectUserById(state, userId))
  const curUserId = useSelector((state) => state.auth.user.id)

  let buttonType

  // if (userId === curUserId) {
  //   buttonType = "Edit"
  // } else if (user.following.find(userId)) {
  //   buttonType = "Following"
  // } else {
  //   buttonType = "Follow"
  // }

  buttonType = 'Edit'

  const onClick = () => {
    if (buttonType === 'Edit') {
      console.log('open edit form')
    } else if (buttonType === 'Following') {
      console.log('dispatch unfollow action')
    } else {
      console.log('dispatch follow action')
    }
  }

  return (
    <header className="user-page-header">
      <UserAvatar userId={userId} size={'large'} />
      <div className="user-page-header__info">
        <div className="user-page-header__item">
          <h2>{user.username}</h2>
          <EditProfile user={user} />
          <NewPostModal />
        </div>
        <div className="user-page-header__item">
          <p>{numPosts} posts</p>
          <p>{user.followers.length} followers</p>
          <p>{user.following.length} following</p>
        </div>
        <div className="user-page-header__item">
          <p>
            <strong>{user.name}</strong>
          </p>
        </div>
      </div>
    </header>
  )
}
