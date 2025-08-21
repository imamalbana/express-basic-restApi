const express = require("express");
const app = express();
const port = 3000;
const db = require("./src/db");
const bodyParser = require("body-parser");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Imam");
});

app.get("/mahasiswa", (req, res) => {
  const sql = "SELECT * FROM mahasiswa";
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Gagal mengambil data" });
    }
    res.json(results);
  });
});

app.get("/mahasiswa/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM mahasiswa WHERE id = ${id}`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Gagal mengambil data" });
    }
    res.json(results);
  });
});

app.post("/mahasiswa", (req, res) => {
  const { nama, jurusan } = req.body;
  console.log(req.body);
  const sql = `INSERT INTO mahasiswa (nama,jurusan) VALUES (${nama}', '${jurusan})`;
  db.query(sql, (err, result) => {
    console.log(result);
    if (err) throw err;
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
