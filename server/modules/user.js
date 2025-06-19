import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  fullName : {type:String, required:true},
  email : {type:String, required:true, unique: true, trim: true, lowercase:true},
  password: {type:String, required:true},
},
{timestamps:true})

userSchema.pre('save', async function(next) {
  if(this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next()
})

export const User = mongoose.model("User", userSchema);