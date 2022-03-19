const mysql = require("mysql");


const config = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "hch08124512",
  database: "graduation-project",
};
// []  {} [{} ,id]
exports.db = (sql, sqlParams = []) => {
  return new Promise((resolve, reject) => {
    const pool = mysql.createPool(config);
    pool.getConnection((err, conn) => {
      if (!err) {
        conn.query(sql, sqlParams, (error, results) => {
          if (!error) {
            // console.log(results, "results");
            console.log('数据库连接成功')
            resolve(results);
          } else {
            console.log("error", error);
            reject(error);
          }
        });
      } else {
        console.log("err", err);
        reject(err);
      }
    });
  });
};