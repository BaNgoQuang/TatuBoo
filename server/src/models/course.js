import mongoose from "mongoose"
const Schema = mongoose.Schema

const CourseSchema = new Schema({
  OrganizationID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organizations',
    required: true
  },
  TeacherID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  CourseName: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  Levels: {
    type: [
      { type: Number, required: true }
    ],
    required: true
  },
  Description: {
    type: [
      {
        Title: { type: String, required: true },
        Content: { type: String, required: true }
      }
    ]
  },
  Votes: {
    type: [
      { type: Number }
    ],
    default: []
  }
}, {
  timestamps: true
})

const Course = mongoose.model("Courses", CourseSchema)

export default Course
