import mongoose from "mongoose"
const Schema = mongoose.Schema

const ScheduleSchema = new Schema({
  TeacherID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    require: true
  },
  CourseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Courses',
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
    require: true
  },
  Address: {
    type: String,
  },
  IsGroupClass: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const Schedule = mongoose.model("Schedules", ScheduleSchema)

export default Schedule
