const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
      if (err) {
        console.log(err);
        return res.status(403).json('Invalid Token!');
      }

      req.user = payload;
      next();
    });
  } else {
    res.status(401).json('User is not authenticated!');
  }
};

module.exports = verify;
