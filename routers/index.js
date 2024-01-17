const router = require("express").Router(); // express router modülü
const routes = require("./routes"); // routes dosyası
router.use(routes); // routes dosyası
module.exports = router; // router dosyası
