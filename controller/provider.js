const uuid = require("uuid");
const { db } = require("../utils/db");

exports.list = async function (req, res, next) {
  try {
    const providerName = req.query.providerName;
    const pageNum = req.query.pageNum;
    const pageSize = req.query.pageSize;
    let sql1 = "select count(provider_id) as total from provider";
    let sqlArr = [];
    let sql3 = "select * from provider";
    let sqlArr3 = [];
    if (providerName) {
      sql1 += " where provider_name like ?";
      sql3 += " where provider_name like ?";
      sqlArr.push(`%${providerName}%`);
      sqlArr3.push(`%${providerName}%`);
    }
    if (pageNum || pageSize) {
      sql3 += " limit ?, ?";
      sqlArr3.push(
        (parseInt(pageNum) - 1) * parseInt(pageSize),
        parseInt(pageSize)
      );
    }
    const ret = await db(sql1, sqlArr);
    const result = await db(sql3, sqlArr3);
    const value = {
      data: {
        status: 200,
        pageInfo: {
          total: ret[0].total,
          pageNum: parseInt(pageNum),
          pageSize: parseInt(pageSize),
          list: result,
        },
      },
    };
    res.status(200).json(value);
  } catch (err) {
    next(err);
  }
};
