const jwt = require('jsonwebtoken');

const checkIsAdmin = async (req, res, next) =>{
  try {
  const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = decoded;
      if (req.user.isAdmin) {
          next();
      }
      else{
          return res.status(401).json({ error: 'you are not authorize to perform this operation! you are not admin' });
      }
  } catch (error) {
    return res.status(403).json({ error: 'Issue validating email' });
  }
}
module.exports =  {
  checkIsAdmin
}