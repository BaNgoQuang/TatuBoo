import mongoose from "mongoose"
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
  SenderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  ReceiverID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  Content: {
    type: String,
    required: trues
  },
  IsSeen: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const Notification = mongoose.model("Notifications", NotificationSchema)

export default Notification
