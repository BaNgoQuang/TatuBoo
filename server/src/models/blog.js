import mongoose from "mongoose"
const Schema = mongoose.Schema

const BlogSchema = new Schema({
  Title: {
    type: String,
    required: true
  },
  Contents: {
    type: [
      {
        Subtitle: { type: String, required: true },
        Subcontent: { type: String, required: true }
      }
    ]
  },
  Followers: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const Blog = mongoose.model("Blogs", BlogSchema)

export default Blog
