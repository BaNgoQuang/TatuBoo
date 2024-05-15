import mongoose from "mongoose"
const Schema = mongoose.Schema

const CourseSchema = new Schema({
  OrganizationID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organizations',
    require: true
  },
  TeacherID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    require: true
  },
  CourseName: {
    type: String,
    require: true
  },
  Price: {
    type: Number,
    require: true
  },
  Levels: {
    type: [
      { type: Number, require: true }
    ],
    require: true
  },
  Description: {
    type: [
      {
        Title: { type: String, require: true },
        Content: { type: String, require: true }
      }
    ]
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

const Course = mongoose.model("Courses", CourseSchema)

export default Course
