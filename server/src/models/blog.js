import mongoose from "mongoose"
const Schema = mongoose.Schema

const BlogSchema = new Schema({
  Author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  Title: {
    type: String,
    required: true
  },
  Contents: {
    type: String,
    required: true
  },
  Followers: {
    type: Number,
    default: 0
  },
  IsDeleted: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
})

const Blog = mongoose.model("Blogs", BlogSchema)

export default Blog
