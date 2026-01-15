var express = require("express");
var dayjs = require("dayjs");
var util = require("util");
var router = express.Router();

var db = require("../utils/database");

router.use((req, res, next) => {
  console.log("---------------------------");
  console.log(req.url, "@", dayjs().format("YYYY-MM-DD HH:mm:ss"));
  console.log("---------------------------");
  next();
});

router.get("/read", async (req, res) => {
  console.log("//// READ PATIENT ////");
  const query = util.promisify(db.query).bind(db);
  try {
    const rows = await query("SELECT * FROM patient");
    res.send(rows);
  } catch (e) {
    throw e;
  }
});

router.get("/readByInstitution", async (req, res) => {
  console.log("//// READ PATIENT BY INSTITUTION ////");
  try {
    console.log(req.query);
    const query = util.promisify(db.query).bind(db);
    const rows = await query("SELECT * FROM patient WHERE institution = ?", req.query.institution);
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Some error on server.", error: e });
  }
});

router.get("/readById", async (req, res) => {
  console.log("//// READ PATIENT BY ID ////");
  try {
    const query = util.promisify(db.query).bind(db);
    const rows = await query("SELECT * FROM patient WHERE id = ?"[req.query.id]);
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Some error on server.", error: e });
  }
});

router.post("/create", async (req, res, next) => {
  console.log("//// CREATE PATIENT ////");
  try {
    const query = util.promisify(db.query).bind(db);
    const data = req.body.data;
    const insertedRow = await query("INSERT INTO patient SET ?", data);
    res.send(insertedRow);
  } catch (err) {
    throw err;
  }
});

router.post("/update", async (req, res, next) => {
  console.log("//// UPDATE PATIENT ////");
  try {
    let data = req.body.data;
    let whereId = data.id;
    delete data.id;

    const columns = Object.keys(data);
    const values = Object.values(data);

    const query = util.promisify(db.query).bind(db);
    const updatedRow = await query("UPDATE patient SET " + columns.join(" = ?, ") + " = ? WHERE id = " + whereId, values);

    res.send(updatedRow);
  } catch (err) {
    throw err;
  }
});

router.post("/delete", async (req, res, next) => {
  console.log("//// DELETE PATIENT ////");
  try {
    const query = util.promisify(db.query).bind(db);
    const deletedRow = await query("UPDATE patient SET is_deleted = 1 WHERE id = " + req.body.data.id);
    res.send(deletedRow);
  } catch (err) {
    throw err;
  }
});

module.exports = router;
