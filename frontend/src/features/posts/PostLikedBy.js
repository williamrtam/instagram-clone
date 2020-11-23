import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

import {UserAvatar} from '../users/UserAvatar'
import {selectUserById} from '../users/usersSlice'

export const PostLikedBy = ({likerIds}) => {
  const history = useHistory()
  const firstLiker = useSelector((state) => selectUserById(state, likerIds[0]))
  const toUserPage = () => {
    history.push(`/${firstLiker.username}`, {userId: firstLiker.userId})
  }

  const content1 = (
    <>
      Liked by{' '}
      <span className="post-liked-by__name" onClick={toUserPage}>
        <strong>{firstLiker.username}</strong>
      </span>
    </>
  )

  let content2 = ''
  if (likerIds.length > 1) {
    content2 = (
      <>
        and{' '}
        <span className="post-liked-by__others">
          <strong>{likerIds.length - 1} others</strong>
        </span>
      </>
    )
  }

  // let content3 = ''
  // const openModal = () => {
  //   let likers = []
  //   for (let i = 0; i < likerIds.length; i++) {
  //     let curLiker = useSelector((state) => selectUserById(state, likerIds[i]))
  //     likers.push(curLiker)
  //   }
  //   content3 = <UserListModal users={likers} title="Likes" isOpen={true} />
  // }

  return (
    <div className="post-liked-by">
      <div className="post-liked-by__avatar">
        <UserAvatar userId={likerIds[0]} size="small" />
      </div>
      <div className="post-liked-by__text">
        <p>
          {content1} {content2}
        </p>
      </div>
    </div>
  )
}
