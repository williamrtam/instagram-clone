import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import FileBase from 'react-file-base64'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import {editProfile} from './usersSlice'

export const EditProfile = ({user}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.user.id)

  const onFileSelect = (avatar) => {
    setAvatar(avatar)
  }

  const handleChanges = async (e) => {
    e.preventDefault()
    try {
      const userData = {
        userId: userId,
        name: name,
        email: email,
        username: username,
        password: password,
        avatar: avatar,
      }
      dispatch(editProfile(userData))
      handleClose()
    } catch (err) {
      console.error('Failed to save the changes: ', err)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className="edit-profile__button">
      <Button onClick={() => setIsOpen(true)} variant="contained" color="default" size="small">
        <strong>Edit Profile</strong>
      </Button>
      <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle>
          <strong>Edit Profile</strong>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            defaultValue={user.name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            defaultValue={user.email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            defaultValue={user.username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <div>
            <h3>Change Profile Avatar Photo.</h3>
            <FileBase type="file" multiple={false} onDone={({base64}) => onFileSelect(base64)} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleChanges} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
