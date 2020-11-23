import express from 'express'

import auth from '../middleware/auth.js'
import {getUsers, followUser, unfollowUser, editProfile} from '../controllers/users.js'

const router = express.Router()

router.get('/getUsers', getUsers)
router.get('/followUser', auth, followUser)
router.get('/unfollowUser', auth, unfollowUser)
router.post('/editProfile', auth, editProfile)

export default router
