const express = require("express");
require("dotenv").config();
const mysql = require("mysql");
const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "daily_devs",
});

db.connect((err) => {
  if (err) {
    console.error("error connecting to DB: " + err.stack);
    return;
  }

  console.log("DB connected as id " + db.threadId);
});

app.get("/blogs", async (req, res) => {
  db.query("SELECT * FROM blogs", (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post("/blog", async (req, res) => {
  db.query("SELECT POST FROM blogs", (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      db.query(
        "INSERT INTO blogs VALUES(?, ?, ?)",
        [`${req.body.title}`, `${req.body.value}`],
        (err, result) => {
          if (err) throw err;
          // console.log(result);
          // console.log(field);
          res.send(result);
        }
      );
    } else {
      db.query(
        "INSERT INTO blogs VALUES(?, ?, ?)",
        [101, `${req.body.title}`, `${req.body.value}`],
        (err, result) => {
          if (err) throw err;
          // console.log(result);
          // console.log(field);
          res.send(result);
        }
      );
    }
  });
});

app.listen(port, () => {
  console.log("Server is runing at port", port);
});
