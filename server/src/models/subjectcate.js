import mongoose from "mongoose"
const Schema = mongoose.Schema

const SubjectCateSchema = new Schema({
  SubjectCateName: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const SubjectCateName = mongoose.model("SubjectCates", SubjectCateSchema)

export default SubjectCateName
