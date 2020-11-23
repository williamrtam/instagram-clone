import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  status: '',
  error: null,
  user: null,
}

export const tokenConfig = (getState) => {
  const token = getState().auth.token
  if (token) {
    axios.defaults.headers.common['Authorization'] = token
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export const authUser = createAsyncThunk('auth/authUser', async () => {
  const {data} = await axios.get('http://localhost:5000/auth/user', tokenConfig)
  return data
})

export const login = createAsyncThunk('auth/login', async (userInfo) => {
  const {data} = await axios.post('http://localhost:5000/auth/login', userInfo)
  return data
})

export const register = createAsyncThunk('auth/register', async (userInfo) => {
  const {data} = await axios.post('http://localhost:5000/auth/register', userInfo)
  return data
})

const isBadAuth = (action) => {
  const badTypes = [
    'auth/register/rejected',
    'auth/logout/fulfilled',
    'auth/login/rejected',
    'auth/loadUser/rejected',
  ]
  return badTypes.includes(action.type)
}

const isGoodAuth = (action) => {
  const goodTypes = ['auth/login/fulfilled', 'auth/register/fulfilled']
  return goodTypes.includes(action.type)
}

const isPending = (action) => {
  return action.type.startsWith('auth') && action.type.endsWith('pending')
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state, action) {
      localStorage.removeItem('token')
      state.isAuthenticated = false
      state.token = null
      state.user = null
      state.status = 'succeeded'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addMatcher(isBadAuth, (state, action) => {
        state.isAuthenticated = false
        state.token = null
        state.user = null
        state.status = 'failed'
        state.error = action.payload
        localStorage.removeItem('token')
      })
      .addMatcher(isGoodAuth, (state, action) => {
        localStorage.setItem('token', action.payload.token)
        state.status = 'succeeded'
        state.isAuthenticated = true
        state.user = action.payload
        state.token = localStorage.getItem('token')
      })
      .addMatcher(isPending, (state, action) => {
        state.status = 'loading'
      })
  },
})

export const {logout} = authSlice.actions

export default authSlice.reducer
