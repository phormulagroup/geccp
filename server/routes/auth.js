var express = require("express");
var dayjs = require("dayjs");
var router = express.Router();
const util = require("util");
const bcrypt = require("bcryptjs");

var db = require("../utils/database");
const { verifyToken, createToken, createRecoverPasswordToken } = require("../utils/token");

const saltRounds = 10;

router.use((req, res, next) => {
  console.log("---------------------------");
  console.log(req.url, "@", dayjs().format("YYYY-MM-DD HH:mm:ss"));
  console.log("---------------------------");
  next();
});

router.get("/encryptPasswod", async (req, res, next) => {
  try {
    res.send({ password: await bcrypt.hash(req.query.password, saltRounds) });
  } catch (err) {
    throw err;
  }
});

router.post("/verifyToken", async (req, res, next) => {
  console.log("///// VERIFY TOKEN /////");
  try {
    let token = req.body.data;
    const result = await verifyToken(token);
    if (result.token_valid) {
      const query = util.promisify(db.query).bind(db);
      const user = await query("SELECT * FROM user WHERE id = ?", result.token_decoded.id);
      if (user.length > 0) {
        if (user[0].email === result.token_decoded.email && result.token_decoded.password === user[0].password) {
          const newToken = await createToken(user[0]);
          console.log("TOKEN IS VALID");
          res.send({ token: newToken, token_valid: true, user: user[0] });
        } else {
          console.log("TOKEN IS NOT VALID");
          res.send({ token_valid: false });
        }
      } else {
        res.send({ token_valid: false });
      }
    } else {
      return res.status(401).send("Invalid Token");
    }
  } catch (err) {
    throw err;
  }
});

router.post("/verifyTokenGeneratePassword", async (req, res, next) => {
  console.log("///// VERIFY TOKEN GENERATE PASSWORD /////");
  try {
    let token = req.body.data;
    const result = await verifyToken(token);
    if (result.token_valid) {
      const query = util.promisify(db.query).bind(db);
      const user = await query("SELECT * FROM user WHERE user.email = ?", result.token_decoded.email);
      if (user.length > 0 && user[0].email === result.token_decoded.email && (!user[0].password || user[0].generate_password)) {
        console.log("TOKEN IS VALID");
        res.send({ token_valid: true, user: user[0] });
      } else {
        res.send({ token_valid: false });
      }
    } else {
      res.send({ token_valid: false });
    }
  } catch (err) {
    throw err;
  }
});

router.post("/generatePassword", async (req, res, next) => {
  console.log("///// GENERATE PASSWORD /////");
  try {
    let data = req.body.data;
    const query = util.promisify(db.query).bind(db);
    const password = await bcrypt.hash(data.password, saltRounds);
    await query("UPDATE user SET password = ?, generate_password = 0 WHERE email = ?", [password, data.email]);
    res.send({ updated: true });
    conn.release();
  } catch (err) {
    throw err;
  }
});

router.post("/login", async (req, res, next) => {
  console.log("///// LOGIN /////");
  try {
    const query = util.promisify(db.query).bind(db);
    let data = req.body.data;
    console.log(data);
    const user = await query("SELECT * FROM user WHERE email = ?", [data.email]);
    console.log(user);
    if (user.length > 0) {
      const comparePassword = await bcrypt.compare(data.password, user[0].password);
      if (comparePassword) {
        let jwtToken = await createToken(user[0]);
        res.send({ user: user[0], token: jwtToken });
      } else {
        res.send({ user: null, message: "This password is not correct, try again!" });
      }
    } else {
      res.send({ user: null, message: "This user does not exist in our database!" });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
});

router.post("/recover", async (req, res, next) => {
  console.log("///// RECOVER PASSWORD E-MAIL /////");
  try {
    const query = util.promisify(db.query).bind(db);
    let data = req.body.data;
    const user = await query("SELECT * FROM user WHERE email = ?", data.email);
    if (user.length > 0) {
      const token = await createRecoverPasswordToken(data);
      res.send({ user: true });
    } else {
      res.send({ user: false, message: "This e-mails is not registered on our database!" });
    }
  } catch (err) {
    throw err;
  }
});

router.post("/recoverPassword", async (req, res, next) => {
  console.log("///// RECOVER PASSWORD /////");
  let data = req.body.data;
  try {
    const query = util.promisify(db.query).bind(db);
    const token = await verifyToken(req.body.data.token);

    if (token.token_valid) {
      let cryptedPassword = await bcrypt.hash(req.body.data.password, saltRounds);
      const updatedRow = await query("UPDATE user SET password = ? WHERE email = ?", [cryptedPassword, token.token_decoded.email]);
      if (updatedRow.affectedRows === 1) {
        res.send({ updated: true });
      } else {
        res.send({ updated: false, message: "Something wrong happened, please verify if the link is the correct one." });
      }
    } else {
      res.send({ user: false, message: "Your time to recover password has expired, you'll need to make the process again." });
    }
  } catch (err) {
    throw err;
  }
});

module.exports = router;
