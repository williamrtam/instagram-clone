import React, {useState} from 'react'

import {UserAvatar} from './UserAvatar'
import {DialogContent, Dialog, DialogTitle} from '@material-ui/core'

export const UserListModal = ({users, title, isOpen}) => {
  const content = users.map((user) => {
    ;<div className="user-list-modal">
      <div>
        <UserAvatar userId={user.userId} size="small" />
      </div>
      <div className="user-list-modal__userItem">
        <p className="user-list-modal__username">
          <strong>{user.username}</strong>
        </p>
        <p className="user-list-modal__name">{user.name}</p>
      </div>
    </div>
  })

  return (
    <div className="new-post-modal__button">
      <Dialog open={isOpen} onClose={() => (isOpen = false)} aria-labelledby="form-dialog-title">
        <DialogTitle>
          <strong>{title}</strong>
        </DialogTitle>
        <DialogContent>{content}</DialogContent>
      </Dialog>
    </div>
  )
}
