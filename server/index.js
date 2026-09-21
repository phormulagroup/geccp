const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const missingEnv = ["DB_HOST", "DB_NAME", "DB_USER", "DB_PASSWORD", "JWT_SECRET"].filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  console.error(
    `Faltam variáveis de ambiente: ${missingEnv.join(", ")}. Cria o ficheiro ${path.join(__dirname, ".env")} (a partir de .env.example) ou define-as no painel do alojamento.`
  );
  process.exit(1);
}

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

app.set("trust proxy", 1);

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

app.use(limiter);

app.use(express.json());

const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
  : null;

if (!corsOrigins) {
  console.warn("CORS_ORIGIN não está definido — a aceitar pedidos de qualquer origem. Define CORS_ORIGIN no .env para restringir.");
}

app.use(cors(corsOrigins ? { origin: corsOrigins } : undefined));

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
app.use("/logs", middleware, logsRouter);
app.use("/user", middleware, userRouter);
app.use("/patient", middleware, patientRouter);

module.exports = app;
