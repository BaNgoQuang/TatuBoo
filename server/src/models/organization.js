import mongoose from "mongoose"
const Schema = mongoose.Schema

const OrganizationSchema = new Schema({
  OrganizationName: {
    type: String,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
  Phone: {
    type: String,
    required: true
  },
  RoleID: {
    type: Number,
    default: 2
  }
}, {
  timestamps: true
})

const Organization = mongoose.model("Organizations", OrganizationSchema)

export default Organization
