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
    // 数据验证
    // 生成token
    const user = req.body;
    const token = await jwt.sign(
      {
        userId: req.body.user_id,
      },
      jwtSecret,
      {
        expiresIn: 60 * 60 * 24,
      }
    );

    const sql = "select * from users where username = ? and password = ?";
    const sql1 = "select * from users where username = ?";
    const sqlArr1 = [user.user_id];
    const sqlArr = [user.user_id, user.password];
    const ret = await db(sql, sqlArr);
    const ret1 = await db(sql1, sqlArr1);
    console.log(ret);
    if (ret1.length > 0) {
      if (ret.length > 0) {
        delete user.password;
        return res.status(200).send({
          data: {
            status: 200,
            statusText: "success",
            ...user,
            token,
            message: "登录成功",
          },
        });
      } else {
        res.status(200).send({
          data: {
            status: 200,
            statusText: "fail",
            message: "用户名或者密码错误",
          },
        });
      }
    } else {
      return res
        .status(200)
        .send({ status: 200, statusText: "fail", message: "用户名不存在" });
    }
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

exports.allUsersInfo = async function (req, res, next) {
  const username = req.query.username;
  const pageNum = req.query.pageNum;
  const pageSize = req.query.pageSize;
  let sql1 = "select count(user_id) as total from users";
  let sqlArr = [];
  let sql3 = "select * from users";
  let sqlArr3 = [];
  if (username) {
    sql1 += " where username like ?";
    sql3 += " where username like ?";
    sqlArr.push(`%${username}%`);
    sqlArr3.push(`%${username}%`);
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
};
