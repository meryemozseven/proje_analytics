////
const express = require("express"); // express modülünü dahil eder.
const app = express(); // express uygulaması oluşturur.
const router = require("./routers"); // router dosyasını dahil eder.
const path = require("path");
const cors = require("cors");
const port = 3000;

app.js;
//////
require("dotenv").config();
//////////////
app.use(cors());
//////
app.use(
  express.json({ extended: true, limit: "50mb", parameterLimit: 500000 })
); // json formatında gelen verileri okumak
app.use("/api", router); // api yolu

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
// Define routes and middleware functions
router.get("/", (req, res) => {
  res.send("This is a route in the routes module");
});
///////////////////////////////
app.use(express.static(path.join(__dirname, "")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/addUser", (req, res) => {
  res.sendFile(path.join(__dirname, "addUser.html"));
});
app.get("/analytics", (req, res) => {
  res.sendFile(path.join(__dirname, "analytics.html"));
});
app.get("/urun", (req, res) => {
  res.sendFile(path.join(__dirname, "urun.html"));
});
app.get("/tedarik", (req, res) => {
  res.sendFile(path.join(__dirname, "tedarik.html"));
});
app.get("/yuzde_yirmi", (req, res) => {
  res.sendFile(path.join(__dirname, "yuzde_yirmi.html"));
});
app.get("/yuzde_yirmi_dokuz", (req, res) => {
  res.sendFile(path.join(__dirname, "yuzde_yirmi_dokuz.html"));
});
app.get("/yuzdeyirmiazdokuz", (req, res) => {
  res.sendFile(path.join(__dirname, "yuzdeyirmiazdokuz.html"));
});
app.get("/yuzdeyirmiazalti", (req, res) => {
  res.sendFile(path.join(__dirname, "yuzdeyirmiazalti.html"));
});

app.get("/envanter", (req, res) => {
  res.sendFile(path.join(__dirname, "envanter.html"));
});

///////////////
