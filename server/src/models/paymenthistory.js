import mongoose from "mongoose"
const Schema = mongoose.Schema

const PaymentHistorySchema = new Schema({
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  FeeType: {
    type: Number,
    required: true
  },
  PaymentInfor: {
    type: String,
    required: true
  },
  PaymentTime: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
})

const PaymentHistory = mongoose.model("PaymentHistorys", PaymentHistorySchema)

export default PaymentHistory
