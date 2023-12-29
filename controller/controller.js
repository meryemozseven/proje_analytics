const dbConn = require("../db/mysql_connect");
const util = require("util");
const dbQuerry = util.promisify(dbConn.query).bind(dbConn);
/////////////katsay
const katSaySorgusu = (req, res) => {
  const { categoryCount } = req.body;
  dbConn.query(
    "SELECT COUNT(*) as categoryCount FROM categori",
    [categoryCount],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};
//////product
const productSaySorgusu = (req, res) => {
  const { productCount } = req.body;
  dbConn.query(
    "SELECT COUNT(*) as productCount FROM urunler",
    [productCount],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};
///satislar
const satisSaySorgusu = (req, res) => {
  const { satisCount } = req.body;
  dbConn.query(
    "SELECT COUNT(*) as satisCount FROM satislar",
    [satisCount],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};
//users
const userSaySorgusu = (req, res) => {
  const { userCount } = req.body;
  dbConn.query(
    "SELECT COUNT(*) as userCount FROM kullanicilar",
    [userCount],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};
///////////////////
const altiAySatis = (req, res) => {
  dbConn.query(
    `
    SELECT
    YEAR(s.satis_tarih) AS yil,
    MONTH(s.satis_tarih) AS ay,
    SUM(us.satis_miktari) AS aylik_satis
FROM
    satislar s
JOIN
    urun_satis us ON s.satis_id = us.satis_id
WHERE
    s.satis_tarih >= DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH)
GROUP BY
    yil, ay
ORDER BY
    yil DESC, ay DESC;

    `,
    (err, result) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      } else {
        res.send({ success: true, data: result });
      }
    }
  );
};
//////urun sayfası
const UrunleriGetir = (req, res) => {
  dbConn.query("SELECT * FROM urunler", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
};
////tedarik sayfası
const tedarikciGetir = (req, res) => {
  dbConn.query("SELECT * FROM tedarikci", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
};
//////
const tahminiSatis = (req, res) => {
  dbConn.query(
    `
    SELECT 
    YEAR(satislar.satis_tarih) AS year,
    MONTH(satislar.satis_tarih) AS month,
    AVG(urun_satis.satis_miktari) * 1.2 AS avg_sales
FROM 
    satislar
INNER JOIN urun_satis ON satislar.satis_id = urun_satis.satis_id
WHERE 
    satislar.satis_tarih BETWEEN CURDATE() - INTERVAL 6 MONTH AND CURDATE()
GROUP BY 
    year, month
ORDER BY 
    year, month;

    `,
    (err, result) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      } else {
        res.send({ success: true, data: result });
      }
    }
  );
};
////////
const tahminiDokuzSatis = (req, res) => {
  dbConn.query(
    `
    SELECT 
    YEAR(satislar.satis_tarih) AS year,
    MONTH(satislar.satis_tarih) AS month,
    AVG(urun_satis.satis_miktari) * 1.15 AS avg_sales
FROM 
    satislar
INNER JOIN urun_satis ON satislar.satis_id = urun_satis.satis_id
WHERE 
    satislar.satis_tarih BETWEEN CURDATE() - INTERVAL 9 MONTH AND CURDATE()
GROUP BY 
    year, month
ORDER BY 
    year, month;

    `,
    (err, result) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      } else {
        res.send({ success: true, data: result });
      }
    }
  );
};
/////20%
const yuzdeyirmi = (req, res) => {
  dbConn.query(
    `
    SELECT 
    YEAR(satislar.satis_tarih) AS year,
    MONTH(satislar.satis_tarih) AS month,
    AVG(urun_satis.satis_miktari) * 1.2 * 1.2 AS avg_sales
FROM 
    satislar
INNER JOIN urun_satis ON satislar.satis_id = urun_satis.satis_id
WHERE 
    satislar.satis_tarih BETWEEN CURDATE() - INTERVAL 6 MONTH AND CURDATE()
GROUP BY 
    year, month
ORDER BY 
    year, month;


    `,
    (err, result) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      } else {
        res.send({ success: true, data: result });
      }
    }
  );
};
////yuzeyirmidokuzay
const yuzdeyirmidokuz = (req, res) => {
  dbConn.query(
    `
    SELECT 
    YEAR(satislar.satis_tarih) AS year,
    MONTH(satislar.satis_tarih) AS month,
    AVG(urun_satis.satis_miktari) * 1.2 * 1.15 AS avg_sales
FROM 
    satislar
INNER JOIN urun_satis ON satislar.satis_id = urun_satis.satis_id
WHERE 
    satislar.satis_tarih BETWEEN CURDATE() - INTERVAL 9 MONTH AND CURDATE()
GROUP BY 
    year, month
ORDER BY 
    year, month;


    `,
    (err, result) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      } else {
        res.send({ success: true, data: result });
      }
    }
  );
};
/////satıslar yuzde yirmi az olursa
////9ay
const yuzdeyirmiazdokuz = (req, res) => {
  dbConn.query(
    `
    SELECT 
    YEAR(satislar.satis_tarih) AS year,
    MONTH(satislar.satis_tarih) AS month,
    AVG(urun_satis.satis_miktari) * 0.8 * 1.15 AS avg_sales
FROM 
    satislar
INNER JOIN urun_satis ON satislar.satis_id = urun_satis.satis_id
WHERE 
    satislar.satis_tarih BETWEEN CURDATE() - INTERVAL 9 MONTH AND CURDATE()
GROUP BY 
    year, month
ORDER BY 
    year, month;


    `,
    (err, result) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      } else {
        res.send({ success: true, data: result });
      }
    }
  );
};
///6ay
const yuzdeyirmiazalti = (req, res) => {
  dbConn.query(
    `
    SELECT 
    YEAR(satislar.satis_tarih) AS year,
    MONTH(satislar.satis_tarih) AS month,
    AVG(urun_satis.satis_miktari) * 0.8 * 1.2 AS avg_sales
FROM 
    satislar
INNER JOIN urun_satis ON satislar.satis_id = urun_satis.satis_id
WHERE 
    satislar.satis_tarih BETWEEN CURDATE() - INTERVAL 6 MONTH AND CURDATE()
GROUP BY 
    year, month
ORDER BY 
    year, month;

    `,
    (err, result) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      } else {
        res.send({ success: true, data: result });
      }
    }
  );
};
////Geçmiş 6 ayın ortalamasının %10 daha yüksek olması
const yuzdeonfazla = (req, res) => {
  dbConn.query(
    `
    SELECT 
    YEAR(satislar.satis_tarih) AS year,
    MONTH(satislar.satis_tarih) AS month,
    AVG(urun_satis.satis_miktari) * 1.2 * 1.1 AS avg_sales
FROM 
    satislar
INNER JOIN urun_satis ON satislar.satis_id = urun_satis.satis_id
WHERE 
    satislar.satis_tarih BETWEEN CURDATE() - INTERVAL 6 MONTH AND CURDATE()
GROUP BY 
    year, month
ORDER BY 
    year, month;

    `,
    (err, result) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      } else {
        res.send({ success: true, data: result });
      }
    }
  );
};
////Geçmiş 9 ayın ortalamasının %10 daha yüksek olması
const yuzdeonfazladokuz = (req, res) => {
  dbConn.query(
    `
    SELECT 
    YEAR(satislar.satis_tarih) AS year,
    MONTH(satislar.satis_tarih) AS month,
    AVG(urun_satis.satis_miktari) * 1.1 * 1.5 AS avg_sales
FROM 
    satislar
INNER JOIN urun_satis ON satislar.satis_id = urun_satis.satis_id
WHERE 
    satislar.satis_tarih BETWEEN CURDATE() - INTERVAL 6 MONTH AND CURDATE()
GROUP BY 
    year, month
ORDER BY 
    year, month;

    `,
    (err, result) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      } else {
        res.send({ success: true, data: result });
      }
    }
  );
};
////Geçmiş 9 ayın ortalamasının %10 daha az olması
const yuzdeonazdokuz = (req, res) => {
  dbConn.query(
    `
    SELECT 
    YEAR(satislar.satis_tarih) AS year,
    MONTH(satislar.satis_tarih) AS month,
    AVG(urun_satis.satis_miktari) * 1.2 * 0.9 AS avg_sales
FROM 
    satislar
INNER JOIN urun_satis ON satislar.satis_id = urun_satis.satis_id
WHERE 
    satislar.satis_tarih BETWEEN CURDATE() - INTERVAL 9 MONTH AND CURDATE()
GROUP BY 
    year, month
ORDER BY 
    year, month;


    `,
    (err, result) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      } else {
        res.send({ success: true, data: result });
      }
    }
  );
};
////Geçmiş 6 ayın ortalamasının %10 daha az olması
const yuzdeonaz = (req, res) => {
  dbConn.query(
    `
    SELECT 
    YEAR(satislar.satis_tarih) AS year,
    MONTH(satislar.satis_tarih) AS month,
    AVG(urun_satis.satis_miktari) * 0.9 * 1.5 AS avg_sales
FROM 
    satislar
INNER JOIN urun_satis ON satislar.satis_id = urun_satis.satis_id
WHERE 
    satislar.satis_tarih BETWEEN CURDATE() - INTERVAL 6 MONTH AND CURDATE()
GROUP BY 
    year, month
ORDER BY 
    year, month;
    `,
    (err, result) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      } else {
        res.send({ success: true, data: result });
      }
    }
  );
};

////ENVANTER
const envanterGetir = (req, res) => {
  dbConn.query(
    "SELECT e.envanter_id, e.il_id, ei.il_ad, ue.urun_id, ue.stok_miktari FROM envanter AS e INNER JOIN urun_envanter AS ue ON e.envanter_id = ue.envanter_id LEFT JOIN envanter_iller AS ei ON e.il_id = ei.il_id;",
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json(result);
      }
    }
  );
};
////stok az
const stokAz = (req, res) => {
  dbConn.query(
    `SELECT
      u.urun_ad AS urun_ad,
      ue.stok_miktari AS stok_miktari,
      ei.il_ad AS il_ad
    FROM
      urunler u
    JOIN
      urun_envanter ue ON u.urun_id = ue.urun_id
    JOIN
      envanter e ON ue.envanter_id = e.envanter_id
    JOIN
      envanter_iller ei ON e.il_id = ei.il_id
    WHERE
      ue.stok_miktari < 1000;`,
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json(result);
      }
    }
  );
};

////coksatan
const pieChartVeriGetir = (req, res) => {
  dbConn.query(
    `
    SELECT
    u.urun_id,
    u.urun_ad AS urun_adi,
    SUM(us.satis_miktari) AS toplam_miktar
  FROM
    urunler u
  INNER JOIN
    urun_satis us ON u.urun_id = us.urun_id
  GROUP BY
    u.urun_id, u.urun_ad
  ORDER BY
    toplam_miktar DESC
  LIMIT 5;

  `,
    (err, result) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      } else {
        res.send({ success: true, data: result });
      }
    }
  );
};
//azsatan
const azsatan = (req, res) => {
  dbConn.query(
    `
    SELECT
    u.urun_id,
    u.urun_ad AS urun_adi,
    SUM(us.satis_miktari) AS toplam_miktar
  FROM
    urunler u
  INNER JOIN
    urun_satis us ON u.urun_id = us.urun_id
  GROUP BY
    u.urun_id, u.urun_ad
  ORDER BY
    toplam_miktar ASC
  LIMIT 5;

  `,
    (err, result) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      } else {
        res.send({ success: true, data: result });
      }
    }
  );
};

module.exports = {
  katSaySorgusu,
  productSaySorgusu,
  satisSaySorgusu,
  userSaySorgusu,
  altiAySatis,
  UrunleriGetir,
  tedarikciGetir,
  tahminiSatis,
  tahminiDokuzSatis,
  yuzdeyirmi,
  yuzdeyirmidokuz,
  yuzdeyirmiazdokuz,
  yuzdeyirmiazalti,
  envanterGetir,
  stokAz,
  pieChartVeriGetir,
  azsatan,
  yuzdeonfazla,
  yuzdeonaz,
  yuzdeonfazladokuz,
  yuzdeonazdokuz,
};
