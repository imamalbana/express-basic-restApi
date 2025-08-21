const express = require("express");
const app = express();
const port = 3000;
const db = require("./src/db");
const bodyParser = require("body-parser");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Imam");
});

app.get("/mahasiswa", async (req, res) => {
  try {
    const sql = "SELECT * from mahasiswa";
    const [result] = await db.query(sql);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.get("/mahasiswa/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "SELECT * from mahasiswa WHERE id=?";
    const [result, field] = await db.query(sql, [id]);
    res.json(result);
    console.log(result, field);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.post("/mahasiswa", async (req, res) => {
  try {
    const { nama, jurusan } = req.body;
    const sql = "INSERT INTO mahasiswa (nama, jurusan) VALUES (?,?)";
    const [result] = await db.query(sql, [nama, jurusan]);
    res.json({ message: "Berhasil menambah data", data: result });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.put("/mahasiswa/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { nama, jurusan } = req.body;
    const sql = "UPDATE mahasiswa set nama = ?, jurusan = ? where id = ?";
    const [result] = await db.query(sql, [nama, jurusan, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Mahasiswa tidak di temukan" });
    }
    res.json({ message: "Data berhasil di ubah", data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "gagal update data" });
  }
});

app.delete("/mahasiswa/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "DELETE from mahasiswa where id= ?";
    const [result] = await db.query(sql, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Mahasiswa tidak di temukan" });
    }
    res.json({ message: "Data berhasil di hapus", data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "gagal menghapus data" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
