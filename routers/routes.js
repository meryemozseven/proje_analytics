const router = require("express").Router();
const { katSaySorgusu } = require("../controller/controller");
router.get("/katSaySorgusu", katSaySorgusu);
const { productSaySorgusu } = require("../controller/controller");
router.get("/productSaySorgusu", productSaySorgusu);
const { satisSaySorgusu } = require("../controller/controller");
router.get("/satisSaySorgusu", satisSaySorgusu);
const { userSaySorgusu } = require("../controller/controller");
router.get("/userSaySorgusu", userSaySorgusu);
//////
const { altiAySatis } = require("../controller/controller");
router.get("/altiAySatis", altiAySatis);
const { tahminiDokuzSatis } = require("../controller/controller");
router.get("/tahminiDokuzSatis", tahminiDokuzSatis);

const { UrunleriGetir } = require("../controller/controller");
router.get("/UrunleriGetir", UrunleriGetir);
const { tedarikciGetir } = require("../controller/controller");
router.get("/tedarikciGetir", tedarikciGetir);
const { tahminiSatis } = require("../controller/controller");
router.get("/tahminiSatis", tahminiSatis);
const { yuzdeyirmi } = require("../controller/controller");
router.get("/yuzdeyirmi", yuzdeyirmi);
const { yuzdeyirmidokuz } = require("../controller/controller");
router.get("/yuzdeyirmidokuz", yuzdeyirmidokuz);
const { yuzdeyirmiazdokuz } = require("../controller/controller");
router.get("/yuzdeyirmiazdokuz", yuzdeyirmiazdokuz);
const { yuzdeyirmiazalti } = require("../controller/controller");
router.get("/yuzdeyirmiazalti", yuzdeyirmiazalti);
const { envanterGetir } = require("../controller/controller");
router.get("/envanterGetir", envanterGetir);
const { stokAz } = require("../controller/controller");
router.get("/stokAz", stokAz);
const { pieChartVeriGetir } = require("../controller/controller");
router.get("/pieChartVeriGetir", pieChartVeriGetir);
const { azsatan } = require("../controller/controller");
router.get("/azsatan", azsatan);
const { yuzdeonfazla } = require("../controller/controller");
router.get("/yuzdeonfazla", yuzdeonfazla);
const { yuzdeonaz } = require("../controller/controller");
router.get("/yuzdeonaz", yuzdeonaz);
const { yuzdeonfazladokuz } = require("../controller/controller");
router.get("/yuzdeonfazla", yuzdeonfazla);
const { yuzdeonazdokuz } = require("../controller/controller");
router.get("/yuzdeonaz", yuzdeonaz);

module.exports = router;
