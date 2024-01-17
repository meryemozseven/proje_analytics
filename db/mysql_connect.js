const mysql = require("mysql"); // mysql modülünü dahil
require("dotenv").config(); // .env dosyasını okumak
var dbConn = mysql.createConnection({
  // mysql bağlantısı
  user: "root", // .env dosyasından gelen veriler
  password: "",
  host: "localhost",
  database: "supply_management",
});

dbConn.connect(function (err) {
  // mysql bağlantısını kontrol
  if (err) throw err; // hata varsa hata mesajı
  console.log("Database Connected!"); // bağlantı başarılıysa bağlantı başarılı mesajı
});

module.exports = dbConn;
