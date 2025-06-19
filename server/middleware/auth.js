import jwt from 'jsonwebtoken'
import { User } from '../modules/user.js';


export const auth = async(req, res, next) => {
try {
  
  const token = req.header('Authorization').replace('Bearer', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({_id: decoded.id});

  if(!user) {
    throw new Error();
  }

  req.user = user;
  req.token = token;
  next()

} catch (error) {
  res.status(401).json({
    success:false,
    message:"Please authenticate"
  })
}
}