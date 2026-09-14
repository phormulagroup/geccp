const { verifyToken } = require("./token");

const middleware = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  } else {
    verifyToken(token)
      .then((result) => {
        if (result.token_valid) {
          req.user = result.token_decoded;
          return next();
        } else {
          return res.status(401).send("Invalid Token");
        }
      })
      .catch((err) => {
        return res.status(401).send("Invalid Token");
      });
  }
};

module.exports = middleware;
