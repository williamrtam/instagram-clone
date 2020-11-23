import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import {IconButton} from '@material-ui/core'

import defaultAvatar from '../../images/defaultAvatar.jpg'
import {selectUserById} from './usersSlice'

export const UserAvatar = ({userId, size}) => {
  const user = useSelector((state) => selectUserById(state, userId))
  const history = useHistory()
  let avatarImage = defaultAvatar

  useEffect(() => {
    if (user !== null && user.avatar !== '') {
      avatarImage = user.avatar
    }
  }, [user])

  const onClick = () => {
    history.push(`/${user.username}`, {userId: userId})
  }

  let avatarSize
  let iconStyle
  if (size === 'small') {
    avatarSize = {height: '20px', width: '20px'}
    iconStyle = {width: '20px', height: '20px', padding: '0px'}
  } else if (size === 'medium') {
    avatarSize = {height: '30px', width: '30px'}
    iconStyle = {width: '30px', height: '30px', padding: '0px'}
  } else if (size === 'large') {
    iconStyle = {width: '130px', height: '130px', padding: '0px'}
    avatarSize = {height: '130px', width: '130px'}
  }

  return (
    <IconButton style={iconStyle} onClick={onClick}>
      <Avatar style={avatarSize} alt="avatar" src={avatarImage} />
    </IconButton>
  )
}
