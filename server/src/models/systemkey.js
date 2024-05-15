import mongoose from "mongoose"
const Schema = mongoose.Schema

const SystemKeySchema = new Schema({
  KeyID: {
    type: Number,
    require: true
  },
  KeyName: {
    type: String,
    require: true
  },
  Parents: [
    {
      ParentID: { type: Number, require: true },
      ParentName: { type: String, require: true }
    }
  ],
  IsDeleted: { type: Boolean, require: true, default: false },
}, {
  timestamps: true
})

const SystemKey = mongoose.model("", SystemKeySchema)

export default SystemKey
