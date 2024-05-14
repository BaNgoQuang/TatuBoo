import mongoose from "mongoose"
const Schema = mongoose.Schema

const SystemKeySchema = new Schema({
  KeyID: {
    type: Number,
    required: true
  },
  KeyName: {
    type: String,
    required: true
  },
  Parents: [
    {
      ParentID: { type: Number, required: true },
      ParentName: { type: String, required: true }
    }
  ]
}, {
  timestamps: true
})

const SystemKey = mongoose.model("SystemKeys", SystemKeySchema)

export default SystemKey
