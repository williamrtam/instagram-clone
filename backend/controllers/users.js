import User from '../models/users.js'

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(409).json({message: error.message})
  }
}

export const followUser = async (req, res) => {
  const {requestorId, acceptorId} = req.body
  try {
    const requestor = await User.findById(requestorId)
    await requestor.following.push(acceptorId)
    await requestor.save()
    res.status(200).json(requestor)
  } catch (error) {
    res.status(409).json({message: error.message})
  }
  try {
    const acceptor = await User.findById(acceptorId)
    await acceptor.followers.push(requestorId)
    await acceptor.save()
    res.status(200).json(acceptor)
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

export const unfollowUser = async (req, res) => {
  const {requestorId, acceptorId} = req.body
  try {
    const requestor = await User.findById(requestorId)
    await requestor.update({$pull: {following: acceptorId}})
    await requestor.save()
    res.status(200).json(requestor)
  } catch (error) {
    res.status(409).json({message: error.message})
  }

  try {
    const acceptor = await User.findById(acceptorId)
    await acceptor.update({$pull: {followers: requestorId}})
    await acceptor.save()
    res.status(200).json(acceptor)
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

export const editProfile = async (req, res) => {
  console.log('got here')
  console.log(req.body)
  const {userId, name, email, username, password, avatar} = req.body
  try {
    const toUpdate = {}
    const user = await User.findById(userId)

    if (name !== user.name && name !== '') {
      toUpdate['name'] = name
    }

    if (email !== '' && email != user.email) {
      const hasEmail = await User.findOne(email)
      if (hasEmail === null) {
        toUpdate['email'] = email
      } else {
        throw Error('Email already taken')
      }
    }

    if (username !== user.username && username !== '') {
      const hasUsername = await User.findOne(username)
      if (hasUsername === null) {
        toUpdate['username'] = username
      } else {
        throw Error('Username already taken')
      }
    }

    if (password !== '') {
      const salt = await bcrypt.genSalt()
      if (!salt) {
        throw Error('Something went wrong with bcrypt')
      }
      const hash = await bcrypt.hash(password, salt)
      if (!hash) {
        throw Error('Something went wrong hashing the password')
      }
      toUpdate['password'] = hash
    }

    if (avatar !== user.avatar && avatar !== '') {
      toUpdate['avatar'] = avatar
    }

    User.update({'_id': userId}, {'$set': toUpdate}).exec(function (error, curUser) {
      if (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      } else {
        res.status(200).json(curUser)
      }
    })
  } catch (error) {
    console.log('was an error')
    res.status(400).json({error: error.message})
  }
}
