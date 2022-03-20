const { db } = require("../utils/db");
const jwt = require("../utils/jwt");
const { jwtSecret } = require("../config/config.default");
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

exports.login = async function (req, res, next) {
  try {
    console.log(req.body, "req");
    // 数据验证
    // 生成token
    const token = await jwt.sign(
      {
        userId: req.body.user_id,
      },
      jwtSecret,
      {
        expiresIn: 60 * 60 * 24,
      }
    );

    res.status(200).send({ ...req.body, token });
  } catch (err) {
    next(err);
  }
};

exports.getCurrentUser = async function (req, res, next) {
  try {
    // console.log(req.headers, 'headers')
    // res.send("get user");
    res.status(200).json({ user: req.user });
  } catch (err) {
    next(err);
  }
};