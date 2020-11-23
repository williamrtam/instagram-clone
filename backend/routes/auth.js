import express from 'express'

import auth from '../middleware/auth.js'
import {login, register, authUser} from '../controllers/auth.js'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.get('/user', auth, authUser)

export default router
