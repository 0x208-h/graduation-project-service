const { db } = require("../utils/db");

exports.getUsers = async function (req, res, next) {
  try {
    const sql =
      "Select create_time, count(*) as total from users group by create_time";
    const ret = await db(sql);
    const value = { data: {} };
    if (ret) {
      value.data.status = 200;
      value.data.list = ret;
      return res.status(200).json(value);
    } else {
      value.data.list = [];
      return res.status(500).json(value);
    }
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async function (req, res, next) {
  try {
    const sql =
      "Select create_time, count(*) as total from orders group by create_time";
    const ret = await db(sql);
    const value = { data: {} };
    if (ret) {
      value.data.status = 200;
      value.data.list = ret;
      return res.status(200).json(value);
    } else {
      value.data.list = [];
      return res.status(500).json(value);
    }
  } catch (err) {
    next(err);
  }
};

exports.getAllInfo = async function (req, res, next) {
  try {
    const sql1 = "Select count(*) as userTotal from users";
    const sql2 = "Select count(*) as goodTotal from goods";
    const sql3 = "Select count(*) as orderTotal from orders";
    const ret1 = await db(sql1);
    const ret2 = await db(sql2);
    const ret3 = await db(sql3);
    const value = { data: {} };
    value.data.status = 200;
    value.data.pageInfo = {
      userTotal: ret1[0].userTotal || 0,
      goodTotal: ret2[0].goodTotal || 0,
      orderTotal: ret3[0].orderTotal || 0,
    };
    return res.status(200).json(value);
  } catch (err) {
    next(err);
  }
};
