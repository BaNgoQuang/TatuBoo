import mongoose from "mongoose"
const Schema = mongoose.Schema

const AdminSchema = new Schema({
  SubjectCateID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubjectCates",
  },
  FullName: {
    type: String,
    required: true
  },
  AvatarPath: {
    type: String,
    default: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
  },
  RoleID: {
    type: Number,
    required: true
  },
}, {
  timestamps: true
})

const Admin = mongoose.model("Admins", AdminSchema)

export default Admin
