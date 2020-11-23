import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/users.js'

export const login = async (req, res) => {
  const {username, password} = req.body

  if (!username || !password) {
    return res.status(400).json({msg: 'Please enter all fields'})
  }
  try {
    const user = await User.findOne({username})
    if (!user) {
      throw Error('User does not exist')
    }

    const isSame = await bcrypt.compare(password, user.password)
    if (!isSame) {
      throw Error('Wrong Password ')
    }

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
      expiresIn: 3600,
    })

    if (!token) {
      throw Error('Incorrect token')
    }

    res.status(200).json({
      token,
      id: user.id,
      username: user.username,
    })
  } catch (e) {
    res.status(400).json({msg: e.message})
  }
}

export const register = async (req, res) => {
  const {name, email, username, password} = req.body

  if (!name || !email || !username || !password) {
    return res.status(400).json({msg: 'Fill in all input fields.'})
  }

  try {
    const hasEmail = await User.findOne({email})
    if (hasEmail) throw Error('email already exists')

    const hasUsername = await User.findOne({username})
    if (hasUsername) throw Error('email already exists')

    const salt = await bcrypt.genSalt()
    if (!salt) throw Error('Something went wrong with bcrypt')

    const hash = await bcrypt.hash(password, salt)
    if (!hash) throw Error('Something went wrong hashing the password')

    const newUser = new User({
      name,
      email,
      username,
      password: hash,
      date: new Date().toISOString,
    })

    const savedUser = await newUser.save()
    if (!savedUser) throw Error('Something went wrong saving the user')

    const token = jwt.sign({id: savedUser.id}, process.env.JWT_SECRET, {
      expiresIn: 3600,
    })

    res.status(200).json({
      token,
      id: savedUser.id,
      username: savedUser.username,
    })
  } catch (e) {
    res.status(400).json({error: e.message})
  }
}

export const authUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) throw Error('User does not exist')
    res.json(user)
  } catch (e) {
    res.status(400).json({msg: e.message})
  }
}
