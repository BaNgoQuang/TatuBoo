import mongoose from "mongoose"
const Schema = mongoose.Schema

const AccountSchema = new Schema({
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  OrganizationID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organizations',
  },
  Email: {
    type: String,
    required: true
  },
  Password: {
    type: String,
  }
}, {
  timestamps: true
})

const Account = mongoose.model("Accounts", AccountSchema)

export default Account
