const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const dayjs = require("dayjs");
const express = require("express");
const util = require("util");
const mysql = require("mysql");
const middleware = require("./utils/middleware");

const db = require("./utils/database");
const authRouter = require("./routes/auth");
const logsRouter = require("./routes/logs");
const userRouter = require("./routes/user");
const patientRouter = require("./routes/patient");

const app = express();
const port = process.env.PORT || 4000;

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(compression());

// Limitação de taxa para evitar abusos
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutos
  max: 600,
});

//app.use(limiter);

app.use(express.json());
app.use(cors());

let server = app.listen(port, () => {
  console.log(`---------- STARTING SERVER ----------`);
  console.log(`${dayjs().format("YYYY-MM-DD HH:mm:ss")}`);
  console.log(`Server running at ${port}`);
  console.log(`--------------------`);
});

db.getConnection((error, conn) => {
  console.log(`---------- CONNECTING TO DB ----------`);
  if (error) {
    throw error;
  } else {
    console.log("MySQL database is connected successfully");
    console.log(`--------------------`);
    conn.release();
  }
});

app.use("/media", express.static("media"));

app.get("/", (req, res) => {
  res.end("GECCP API!");
});

app.use("/auth", authRouter);
app.use("/logs", logsRouter);
app.use("/user", userRouter);
app.use("/patient", middleware, patientRouter);

module.exports = app;
