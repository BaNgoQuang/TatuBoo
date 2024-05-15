import mongoose from "mongoose"
const Schema = mongoose.Schema

const SubjectCateSchema = new Schema({
  SubjectCateName: {
    type: String,
    require: true
  },
  Description: {
    type: String,
    require: true
  },
  IsDeleted: { type: Boolean, default: false },
}, {
  timestamps: true
})

const SubjectCateName = mongoose.model("SubjectCates", SubjectCateSchema)

export default SubjectCateName
