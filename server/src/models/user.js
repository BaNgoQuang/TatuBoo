import mongoose from "mongoose"
const Schema = mongoose.Schema

const UserSchema = new Schema({
  OrganizationID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organizations',
    default: null
  },
  FullName: {
    type: String,
    require: true
  },
  Phone: {
    type: String,
  },
  AvatarPath: {
    type: String,
    default: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
  },
  RoleID: {
    type: Number,
    require: true
  },
  Subject: {
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Subjects" }
    ],
    default: []
  },
  Quotes: {
    type: {
      Title: { type: String, require: true },
      Content: { type: String, require: true }
    },
    default: null
  },
  Description: {
    type: String,
    default: null
  },
  Experiences: {
    type: [
      {
        Title: { type: String, require: true },
        Content: { type: String, require: true }
      }
    ],
    default: []
  },
  VideoPaths: {
    type: [
      { type: String }
    ],
    default: []
  },
  Votes: {
    type: [
      { type: Number }
    ],
    default: []
  }
}, {
  timestamps: true
})

const User = mongoose.model("Users", UserSchema)

export default User
