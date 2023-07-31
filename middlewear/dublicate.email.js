const User = require('../schema/user.schema');

const checkDublicateEmail = async (req, res, next) =>{
  
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
  
      if (!user) {
          next();
      }
  else{
      return res.status(401).json({ error: 'Email already Exist!' });
  }
  } catch (error) {
    return res.status(403).json({ error: 'Issue validating email' });
  }
}
module.exports =  {
    checkDublicateEmail
}