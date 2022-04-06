const uuid = require("uuid");
const { db } = require("../utils/db");

exports.getAllOrder = async function (req, res, next) {
  try {
    const order_number = req.query.order_number;
    const pageNum = req.query.pageNum;
    const pageSize = req.query.pageSize;
    let sql1 = "select count(order_id) as total from orders";
    let sqlArr = [];
    let sql3 = "select * from orders";
    let sqlArr3 = [];
    if (order_number) {
      sql1 += " where order_number like ?";
      sql3 += " where order_number like ?";
      sqlArr.push(`%${order_number}%`);
      sqlArr3.push(`%${order_number}%`);
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
