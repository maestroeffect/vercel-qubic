const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost", // cPanel uses localhost for DB
  user: "qubicweb_comments_db", // cPanel MySQL user
  password: "exceedGrace2", // cPanel DB password
  database: "qubicweb_comments_db", // The database you created
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

// POST endpoint for submitting comments
app.post("/comments", (req, res) => {
  const { name, email, message } = req.body;

  const query = "INSERT INTO comments (name, email, message) VALUES (?, ?, ?)";
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error saving comment" });
    } else {
      res.status(200).json({ message: "Comment submitted successfully!" });
    }
  });
});

// GET endpoint for fetching all comments
app.get("/comments", (req, res) => {
  const query = "SELECT * FROM comments ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error fetching comments" });
    } else {
      res.status(200).json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
