const mysql = require("mysql2");

// Create a connection to your MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "testdb",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to the database");
});

module.exports = db;
