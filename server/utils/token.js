const jwt = require("jsonwebtoken");

var privateKey = process.env.JWT_SECRET;

module.exports = {
  verifyToken: function (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, privateKey, function (err, decoded) {
        if (err) {
          resolve({ token_valid: false, error: err });
        } else {
          delete decoded.iat;
          delete decoded.exp;
          resolve({ token_valid: true, token_decoded: decoded });
        }
      });
    });
  },

  createRecoverPasswordToken: function (data) {
    return new Promise((resolve, reject) => {
      jwt.sign(JSON.parse(JSON.stringify(data)), privateKey, { expiresIn: "1d" }, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },

  createToken: function (data) {
    return new Promise((resolve, reject) => {
      jwt.sign(JSON.parse(JSON.stringify(data)), privateKey, { expiresIn: "30d" }, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },

  renewToken: function (data) {
    return new Promise((resolve, reject) => {
      jwt.sign(JSON.parse(JSON.stringify(data)), privateKey, { expiresIn: "7d" }, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
};
