import React from 'react'
import {useSelector} from 'react-redux'

import {PostsList} from '../posts/PostsList'
import {NavBar} from '../auth/NavBar'

export const HomePage = () => {
  const userId = useSelector((state) => state.auth.user.id)
  return (
    <div className="home-page">
      <NavBar userId={userId} />
      <div className="home-page__feed">
        <PostsList />
      </div>
    </div>
  )
}
