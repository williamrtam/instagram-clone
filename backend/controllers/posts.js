import Post from '../models/posts.js'

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).json(posts)
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

export const addPost = async (req, res) => {
  const {userId, caption, image} = req.body
  const date = new Date().toISOString
  const newPost = new Post({userId, caption, image, date})
  try {
    await newPost.save()
    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

export const addComment = async (req, res) => {
  const {postId, userId, content, id} = req.body
  const date = new Date().toISOString
  const newComment = {postId, userId, content, id, date}
  try {
    const post = await Post.findById(postId)
    await post.comments.push(newComment)
    await post.save()
    res.status(201).json(post)
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

export const unlikePost = async (req, res) => {
  const {postId, userId} = req.body
  try {
    const post = await Post.findById(postId)
    await post.likerIds.pull({_id: userId})
    await post.save()
    res.status(201).json(post)
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

export const likePost = async (req, res) => {
  const {postId, userId} = req.body
  try {
    const post = await Post.findById(postId)
    await post.likerIds.push(userId)
    await post.save()
    res.status(201).json({post})
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}
