import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import {register} from './authSlice'
import {getUsers} from '../users/usersSlice'
import instaLogo from '../../images/instaLogo.png'

export const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const canRegister = [username, password].every(Boolean)
  const status = useSelector((state) => state.auth.status)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const history = useHistory()

  const onNameChange = (e) => setName(e.target.value)
  const onEmailChange = (e) => setEmail(e.target.value)
  const onUsernameChange = (e) => setUsername(e.target.value)
  const onPasswordChange = (e) => setPassword(e.target.value)

  useEffect(async () => {
    if (isAuthenticated) {
      await dispatch(getUsers())
      history.push('/')
    }
  }, [isAuthenticated])

  const onRegister = async (e) => {
    e.preventDefault()
    try {
      const userInfo = {
        name: name,
        email: email,
        username: username,
        password: password,
      }
      dispatch(register(userInfo))
    } catch (err) {
      console.error('Registration failed: ', err)
    }
  }

  const onLogin = () => {
    history.push('/login')
  }

  return (
    <div className="login-page">
      <div>
        <div className="login-page__credentials">
          <div className="login-page__logoContainer">
            <img className="login-page__logo" src={instaLogo} alt="insta logo" />
          </div>
          <div className="login-page__input">
            <form>
              <TextField
                variant="outlined"
                autofocus
                margin="dense"
                label="Name"
                onChange={onNameChange}
                fullWidth
              />
              <TextField
                variant="outlined"
                autofocus
                margin="dense"
                label="Email"
                onChange={onEmailChange}
                fullWidth
              />
              <TextField
                variant="outlined"
                margin="dense"
                label="Username"
                onChange={onUsernameChange}
                fullWidth
                autofocus
              />
              <TextField
                variant="outlined"
                margin="dense"
                label="Password"
                onChange={onPasswordChange}
                fullWidth
                autofocus
              />
            </form>
          </div>
          <div className="login-page__button">
            <Button
              variant="contained"
              fullWidth
              color="primary"
              disabled={!canRegister}
              onClick={onRegister}
            >
              Sign Up
            </Button>
          </div>
        </div>
        <div className="login-page__register">
          <p className="login-page__registerText">
            Already have an account?{' '}
            <span className="login-page__registerLink" onClick={onLogin}>
              <strong>Log In</strong>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
