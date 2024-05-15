import mongoose from "mongoose"
const Schema = mongoose.Schema

const SubjectSchema = new Schema({
  SubjectCateID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubjectCates",
    require: true
  },
  SubjectName: {
    type: String,
    require: true
  },
  IsDeleted: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
})

const Subject = mongoose.model("Subjects", SubjectSchema)

export default Subject
