const jwtToken = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({
        msg: 'No token provided'
    });
  try {
    const decoded = jwtToken.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ 
        msg: 'Invalid token' 
    });
  }
};
