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
    required: true
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
    required: true
  },
  Subject: {
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Subjects" }
    ],
    default: []
  },
  Quotes: {
    type: {
      Title: { type: String, required: true },
      Content: { type: String, required: true }
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
        Title: { type: String, required: true },
        Content: { type: String, required: true }
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
  },
  IsByGoogle: {
    type: Boolean,
    required: true
  },
  IsActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

const User = mongoose.model("Users", UserSchema)

export default User
