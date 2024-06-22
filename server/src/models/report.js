import mongoose from "mongoose"
const Schema = mongoose.Schema

const ReportSchema = new Schema({
  Sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  Timetable:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'TimeTables'
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
  IsDeleted: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
})

const Report = mongoose.model("Reports", ReportSchema)

export default Report