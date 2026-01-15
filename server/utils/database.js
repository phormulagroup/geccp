const mysql = require("mysql");
const PORT = process.env.PORT || 3306;

const db = mysql.createPool({
  host: "185.118.114.199",
  database: "phormuladev_geccp",
  user: "phormuladev_geccp_user",
  password: "}9~AN0^6o(YA(g(f",
  port: PORT,
  multipleStatements: true,
});

module.exports = db;
