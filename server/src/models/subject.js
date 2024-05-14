import mongoose from "mongoose"
const Schema = mongoose.Schema

const SubjectSchema = new Schema({
  CourseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: true
  },
  SubjectName: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Subject = mongoose.model("Subjects", SubjectSchema)

export default Subject
