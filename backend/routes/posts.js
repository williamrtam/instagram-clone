import express from 'express'

import auth from '../middleware/auth.js'
import {getPosts, addPost, addComment, likePost, unlikePost} from '../controllers/posts.js'

const router = express.Router()

router.get('/getPosts', getPosts)
router.post('/addPost', auth, addPost)
router.post('/addComment', auth, addComment)
router.post('/likePost', auth, likePost)
router.post('/unlikePost', auth, unlikePost)

export default router
