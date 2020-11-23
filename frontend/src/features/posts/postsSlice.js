import {createSlice, createAsyncThunk, createSelector, createEntityAdapter} from '@reduxjs/toolkit'
import axios from 'axios'

import {tokenConfig} from '../auth/authSlice'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
})

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const addPost = createAsyncThunk('posts/addPost', async (newPost, {getState}) => {
  const {data} = await axios.post(
    'http://localhost:5000/posts/addPost',
    newPost,
    tokenConfig(getState)
  )
  return data
})

export const addComment = createAsyncThunk('posts/addComment', async (newComment, {getState}) => {
  const {data} = await axios.post(
    'http://localhost:5000/posts/addComment',
    newComment,
    tokenConfig(getState)
  )
  return data
})

export const likePost = createAsyncThunk('posts/likePost', async (postData, {getState}) => {
  const {data} = await axios.post(
    'http://localhost:5000/posts/likePost',
    postData,
    tokenConfig(getState)
  )
  return data
})

export const unlikePost = createAsyncThunk('posts/unlikePost', async (postData, {getState}) => {
  const {data} = await axios.post(
    'http://localhost:5000/posts/unlikePost',
    postData,
    tokenConfig(getState)
  )
  return data
})

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  const {data} = await axios.get('http://localhost:5000/posts/getPosts')
  return data
})

const isPending = (action) => {
  return action.type.startsWith('posts') && action.type.endsWith('pending')
}

const isRejected = (action) => {
  return action.type.startsWith('posts') && action.type.endsWith('rejected')
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(likePost.fulfilled, (state, action) => {
        postsAdapter.updateOne(state, action.payload)
        state.status = 'succeeded'
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        postsAdapter.updateOne(state, action.payload)
        state.status = 'succeeded'
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        postsAdapter.upsertMany(state, action.payload)
        state.status = 'succeeded'
      })
      .addCase(addPost.fulfilled, (state, action) => {
        postsAdapter.addOne(state, action.payload)
        state.status = 'succeeded'
      })
      .addCase(addComment.fulfilled, (state, action) => {
        postsAdapter.upsertOne(state, action.payload)
        state.status = 'succeeded'
      })
      .addMatcher(isPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(isRejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts)

export const {postAdded, postUpdated, likeAdded, commentAdded} = postsSlice.actions

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
)

export default postsSlice.reducer
