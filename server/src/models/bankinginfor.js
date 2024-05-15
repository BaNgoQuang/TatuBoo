import mongoose from "mongoose"
const Schema = mongoose.Schema

const BankingInforSchema = new Schema({
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  OrganizationID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organizations',
  },
  BankID: {
    type: Number,
    required: true
  },
  BankNumber: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const BankingInfor = mongoose.model("BankingInfors", BankingInforSchema)

export default BankingInfor
