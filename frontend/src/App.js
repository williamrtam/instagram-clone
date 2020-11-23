import React, {useState, useEffect} from 'react'
import {Switch, Route, BrowserRouter as Router, Redirect} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import './App.css'
import {LogInPage} from './features/auth/LogInPage'
import {RegisterPage} from './features/auth/RegisterPage'
import {UserPage} from './features/users/UserPage'
import {HomePage} from './features/posts/HomePage'
import {authUser} from './features/auth/authSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authUser())
  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LogInPage} />
          <Route exact path="/:username" component={UserPage} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
