const uuid = require("uuid");
const { db } = require("../utils/db");

exports.getAllGoodsInfo = async function (req, res, next) {
  try {
    const goodsName = req.query.goodsName;
    const pageNum = req.query.pageNum;
    const pageSize = req.query.pageSize;
    let sql1 = "select count(goods_id) as total from goods";
    let sqlArr = [];
    let sql3 = "select * from goods";
    let sqlArr3 = [];
    if (goodsName) {
      sql1 += " where goods_name like ?";
      sql3 += " where goods_name like ?";
      sqlArr.push(`%${goodsName}%`);
      sqlArr3.push(`%${goodsName}%`);
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
