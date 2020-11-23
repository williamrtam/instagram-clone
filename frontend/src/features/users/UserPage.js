import React from 'react'
import {useLocation} from 'react-router-dom'

import {PostsGrid} from '../posts/PostsGrid'
import {UserPageHeader} from './UserPageHeader'
import {NavBar} from '../auth/NavBar'

export const UserPage = () => {
  const location = useLocation()
  const userId = location.state.userId

  return (
    <div>
      <NavBar userId={userId} />
      <UserPageHeader userId={userId} />
      <PostsGrid userId={userId} />
    </div>
  )
}
