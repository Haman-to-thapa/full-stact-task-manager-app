import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  title: {type:String, required:true, trim : true},
  description: {type: String, trim:true},
  completed: {type: Boolean, default: false},
  user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"}
}, {
  timestamps:true
})

export const Task = mongoose.model("Task", taskSchema)