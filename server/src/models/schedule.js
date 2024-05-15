import mongoose from "mongoose"
const Schema = mongoose.Schema

const ScheduleSchema = new Schema({
  TeacherID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    require: true
  },
  StudentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    default: null
  },
  StartTime: {
    type: Date,
    require: true
  },
  EndTime: {
    type: Date,
    require: true
  },
  IsOnline: {
    type: Boolean,
    default: true
  },
  Address: {
    type: String,
    require: true
  },
  Votes: {
    type: [
      { type: Number }
    ],
    default: []
  },
  IsDeleted: { type: Boolean, require: true, default: false },
}, {
  timestamps: true
})

const Schedule = mongoose.model("Schedules", ScheduleSchema)

export default Schedule
