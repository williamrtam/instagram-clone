import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    userId: {type: String, required: true},
    caption: {type: String, default: ''},
    image: {type: String, required: true},
    likerIds: {type: [String], default: []},
    comments: {type: Array, default: []},
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

const Post = mongoose.model('Post', postSchema)

export default Post
