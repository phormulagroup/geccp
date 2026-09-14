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

// The patient intake form has ~150 fields in nested clinical sections (disease
// characterization, relapse, palliative treatment lines, ...), and the registry
// needs a history of how a patient's record changed over time — not just the
// latest state. So the form is never overwritten in place: every create/edit
// appends a new row to `patient_clinical_record` (patient_id, clinical_data,
// created_by, created_at). `patient` itself only holds identity/institution.
// Reads join each patient to its most recent record. `expandClinicalData` merges
// the parsed JSON back onto the row so the frontend keeps seeing one flat-ish
// object per patient, as before.
const LATEST_CLINICAL_RECORD_JOIN = `
  LEFT JOIN (
    SELECT r1.* FROM patient_clinical_record r1
    WHERE r1.id = (SELECT r2.id FROM patient_clinical_record r2 WHERE r2.patient_id = r1.patient_id ORDER BY r2.created_at DESC, r2.id DESC LIMIT 1)
  ) pcr ON pcr.patient_id = patient.id
`;

function expandClinicalData(row) {
  const { clinical_data, ...rest } = row;
  if (!clinical_data) return rest;
  let clinicalData;
  try {
    clinicalData = typeof clinical_data === "string" ? JSON.parse(clinical_data) : clinical_data;
  } catch (e) {
    return rest;
  }
  return { ...rest, ...clinicalData, id: rest.id };
}

router.get("/read", async (req, res) => {
  console.log("//// READ PATIENT ////");
  const query = util.promisify(db.query).bind(db);
  try {
    const rows = await query(`SELECT patient.*, pcr.clinical_data FROM patient ${LATEST_CLINICAL_RECORD_JOIN} WHERE patient.is_deleted = 0`);
    res.send(rows.map(expandClinicalData));
  } catch (e) {
    throw e;
  }
});

router.get("/readByInstitution", async (req, res) => {
  console.log("//// READ PATIENT BY INSTITUTION ////");
  try {
    console.log(req.query);
    const query = util.promisify(db.query).bind(db);
    const rows = await query(`SELECT patient.*, pcr.clinical_data FROM patient ${LATEST_CLINICAL_RECORD_JOIN} WHERE patient.id_institution = ? AND patient.is_deleted = 0`, [
      req.query.id_institution,
    ]);
    res.send(rows.map(expandClinicalData));
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Some error on server.", error: e });
  }
});

router.get("/readById", async (req, res) => {
  console.log("//// READ PATIENT BY ID ////");
  try {
    const query = util.promisify(db.query).bind(db);
    const rows = await query(`SELECT patient.*, pcr.clinical_data FROM patient ${LATEST_CLINICAL_RECORD_JOIN} WHERE patient.id = ?`, [req.query.id]);
    res.send(rows.map(expandClinicalData));
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Some error on server.", error: e });
  }
});

// History of every saved version of a patient's clinical record (newest first) —
// for an eventual "ver histórico" view, or research analysis of how the record evolved.
router.get("/history", async (req, res) => {
  console.log("//// READ PATIENT CLINICAL RECORD HISTORY ////");
  try {
    const query = util.promisify(db.query).bind(db);
    const rows = await query(
      `SELECT patient_clinical_record.*, user.name AS created_by_name
       FROM patient_clinical_record
       LEFT JOIN user ON user.id = patient_clinical_record.created_by
       WHERE patient_id = ?
       ORDER BY created_at DESC, id DESC`,
      [req.query.id]
    );
    res.send(
      rows.map((row) => ({
        ...row,
        clinical_data: (() => {
          try {
            return JSON.parse(row.clinical_data);
          } catch (e) {
            return null;
          }
        })(),
      }))
    );
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
    const { id_institution, ...clinicalData } = data;

    const insertedPatient = await query("INSERT INTO patient (id_institution) VALUES (?)", [id_institution ?? null]);
    await query("INSERT INTO patient_clinical_record (patient_id, clinical_data, created_by) VALUES (?, ?, ?)", [
      insertedPatient.insertId,
      JSON.stringify(clinicalData),
      req.user?.id ?? null,
    ]);

    res.send(insertedPatient);
  } catch (err) {
    throw err;
  }
});

router.post("/update", async (req, res, next) => {
  console.log("//// UPDATE PATIENT ////");
  try {
    const data = req.body.data;
    const { id, ...clinicalData } = data;

    const query = util.promisify(db.query).bind(db);
    const insertedRecord = await query("INSERT INTO patient_clinical_record (patient_id, clinical_data, created_by) VALUES (?, ?, ?)", [
      id,
      JSON.stringify(clinicalData),
      req.user?.id ?? null,
    ]);

    res.send(insertedRecord);
  } catch (err) {
    throw err;
  }
});

router.post("/delete", async (req, res, next) => {
  console.log("//// DELETE PATIENT ////");
  try {
    const query = util.promisify(db.query).bind(db);
    const deletedRow = await query("UPDATE patient SET is_deleted = 1 WHERE id = ?", [req.body.data.id]);
    res.send(deletedRow);
  } catch (err) {
    throw err;
  }
});

module.exports = router;
