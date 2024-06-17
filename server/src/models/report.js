import mongoose from "mongoose"
const Schema = mongoose.Schema

const ReportSchema = new Schema({
  Author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  Title: {
    type: Number,
    required: true
  },
  Context: {
    type: String,
    required: true
  },
  IsHandle: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
})

const Report = mongoose.model("Reports", ReportSchema)

export default Report