import mongoose from "mongoose"
const Schema = mongoose.Schema

const OrganizationSchema = new Schema({
  OrganizationName: {
    type: String,
    require: true
  },
  Address: {
    type: String,
    require: true
  },
  Phone: {
    type: String,
    require: true
  },
  IsDeleted: { type: Boolean, require: true, default: false },
}, {
  timestamps: true
})

const Organization = mongoose.model("Organizations", OrganizationSchema)

export default Organization
