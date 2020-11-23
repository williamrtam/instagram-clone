import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit'
import axios from 'axios'

import {tokenConfig} from '../auth/authSlice'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState({
  'status': 'idle',
  'error': null,
})

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const {data} = await axios.get('http://localhost:5000/users/getUsers')
  return data
})

export const followUser = createAsyncThunk('users/followUser', async ({}, {getState}) => {
  const {data} = await axios.get('http://localhost:5000/users/followUser', tokenConfig(getState))
  return data
})

export const unfollowUser = createAsyncThunk('users/unfollowUser', async ({}, {getState}) => {
  const {data} = await axios.get('http://localhost:5000/users/unfollowUser', tokenConfig(getState))
  return data
})

export const editProfile = createAsyncThunk('users/editProfile', async (userData, {getState}) => {
  const {data} = await axios.post(
    'http://localhost:5000/users/editProfile',
    userData,
    tokenConfig(getState)
  )
  return data
})

const isRejected = (action) => {
  return action.type.startsWith('users') && action.type.endsWith('rejected')
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        usersAdapter.setAll(state, action.payload)
        state.status = 'succeeded'
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        usersAdapter.updateOne(state, action.payload)
        state.status = 'succeeded'
      })
      .addMatcher(isRejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export default usersSlice.reducer

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state) => state.users)
