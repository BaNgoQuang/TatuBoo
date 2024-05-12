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
    require: true
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
    ]
  },
  Quote: {
    type: {
      Title: { type: String, require: true },
      Content: { type: String, require: true }
    },
    require: true
  },
  Description: {
    type: String,
    require: true
  },
  Experiences: {
    type: [
      {
        Title: { type: String, require: true },
        Content: { type: String, require: true }
      }
    ]
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
