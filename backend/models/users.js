import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String, default: ''},
    followers: {type: [String], default: []},
    following: {type: [String], default: []},
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

const User = mongoose.model('User', userSchema)

export default User
