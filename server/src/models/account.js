import mongoose from "mongoose"
const Schema = mongoose.Schema

const AccountSchema = new Schema({
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    require: true
  },
  OrganizationID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organizations',
    require: true
  },
  Email: {
    type: String,
    require: true
  },
  Password: {
    type: String,
  },
  IsByGoogle: {
    type: Boolean,
    require: true
  }
}, {
  timestamps: true
})

const Account = mongoose.model("Accounts", AccountSchema)

export default Account
