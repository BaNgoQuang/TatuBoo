import mongoose from "mongoose"
const Schema = mongoose.Schema

const TimeTableSchema = new Schema({
  TeacherID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  StudentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  SubjectID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subjects',
    required: true
  },
  DateAt: {
    type: String,
    required: true
  },
  StartTime: {
    type: Date,
    required: true
  },
  EndTime: {
    type: Date,
    required: true
  },
  LearnType: {
    type: Number,
    required: true
  },
  Address: {
    type: String,
    default: null
  },
  IsDeleted: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
})

const TimeTable = mongoose.model("TimeTables", TimeTableSchema)

export default TimeTable
