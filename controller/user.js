const { db } = require("../utils/db");

exports.get = async function (req, res, next) {
  try {
    const sql = "SELECT * FROM users";
    const ret = await db(sql);
    console.log(ret, "res");
    res.status(200).send(ret);
  } catch (err) {
    next(err);
  }
};
