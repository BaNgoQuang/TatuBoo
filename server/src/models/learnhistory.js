import mongoose from "mongoose"
const Schema = mongoose.Schema

const LearnHistorySchema = new Schema({
  Student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  Teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  Subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subjects",
    required: true
  },
  RegisterDate: {
    type: Date,
    default: Date.now
  },
  LearnNumber: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

const LearnHistory = mongoose.model("LearnHistorys", LearnHistorySchema)

export default LearnHistory
