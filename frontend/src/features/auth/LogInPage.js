import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {useHistory} from 'react-router-dom'

import {login} from './authSlice'
import instaLogo from '../../images/instaLogo.png'

export const LogInPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const canSubmit = [username, password].every(Boolean)

  const onUsernameChange = (e) => setUsername(e.target.value)
  const onPasswordChange = (e) => setPassword(e.target.value)

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/')
    }
  }, [isAuthenticated])

  const onLogIn = async (e) => {
    if (canSubmit) {
      e.preventDefault()
      const userInfo = {username: username, password: password}
      try {
        dispatch(login(userInfo))
      } catch (error) {
        console.error('Login failed: ', error)
        alert('Incorrect Credentials')
      }
    }
  }

  const onRegister = () => {
    history.push('/register')
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
                margin="dense"
                label="Username"
                onChange={onUsernameChange}
                fullWidth
                autofocus
              />
              <TextField
                variant="outlined"
                type="password"
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
              disabled={!canSubmit}
              onClick={onLogIn}
              color="primary"
            >
              Login
            </Button>
          </div>
        </div>
        <div className="login-page__register">
          <p className="login-page__registerText">
            Don't have an account?{' '}
            <span className="login-page__registerLink" onClick={onRegister}>
              <strong>Sign Up</strong>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
