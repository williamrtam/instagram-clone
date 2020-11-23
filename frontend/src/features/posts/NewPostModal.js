import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import FileBase from 'react-file-base64'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import {blue} from '@material-ui/core/colors'
import DialogTitle from '@material-ui/core/DialogTitle'

import {addPost} from './postsSlice'

export const NewPostModal = () => {
  const [caption, setCaption] = useState('')
  const [file, setFile] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.user.id)

  const canUpload = [caption, file].every(Boolean)
  // const userId = useSelector(state => state.auth.user.id)
  const onFileSelect = (file) => {
    setFile(file)
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    try {
      const postData = {userId: userId, caption: caption, image: file}
      dispatch(addPost(postData))
      handleClose()
    } catch (err) {
      console.error('Failed to save the post: ', err)
    }
  }

  const handleClose = () => {
    setFile('')
    setCaption('')
    setIsOpen(false)
  }

  return (
    <div className="new-post-modal__button">
      <Button
        onClick={() => setIsOpen(true)}
        variant="contained"
        color="default"
        size="small"
        startIcon={<AddCircleIcon />}
        style={{color: blue[900]}}
      >
        <strong>New Post</strong>
      </Button>
      <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle>
          <strong>Create New Post</strong>
        </DialogTitle>
        <DialogContent>
          <div>
            <FileBase type="file" multiple={false} onDone={({base64}) => onFileSelect(base64)} />
          </div>
          <TextField
            autofocus
            margin="dense"
            label="Caption"
            onChange={(e) => setCaption(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleUpload} color="primary" disabled={!canUpload}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
