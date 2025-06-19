import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../modules/user.js'


const router = express.Router()

router.post('/register', async (req,res) => {
  try {
    const user = new User(req.body);
    await user.save();

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
    return res.status(201).send({user, token});

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
})


router.post('/login', async (req, res) => {
  try {
    
    const user = await User.findOne({email: req.body.email});
    if(!user) {
      throw new Error('Invalid login credentials'); 
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if(!isMatch) {
      throw new Error('Invalid login credentials')
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
    return res.status(200).json({
      success:true,
      user,
      token,
      message:"login successfully"
    })

  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success:false,
      message:"server error message"
    })
  }
})


export default router;