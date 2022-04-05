const uuid = require("uuid");
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
    console.log(user, "user");
    const token = await jwt.sign(
      {
        userId: user.username,
      },
      jwtSecret,
      {
        expiresIn: 60 * 60 * 2,
      }
    );

    const sql = "select * from users where username = ? and password = ?";
    const sql1 = "select * from users where username = ?";
    const sqlArr1 = [user.username];
    const sqlArr = [user.username, user.password];
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
    const sql = "select * from users where user_id = ?";
    const ret = await db(sql, req.params.id);
    const value = { data: {} };
    if (ret) {
      value.data.status = 200;
      value.data.detail = ret[0];
      return res.status(200).json(value);
    } else {
      value.data.detail = {};
      return res.status(500).json(value);
    }
    // res.status(200).json({ user: req.user });
  } catch (err) {
    next(err);
  }
};

exports.allUsersInfo = async function (req, res, next) {
  try {
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
  } catch (err) {
    next(err);
  }
};

exports.addUserInfo = async function (req, res, next) {
  try {
    // let sql1 = "select count(user_id) as total from users";
    // const ret = await db(sql1);
    // console.log(ret, "ret");
    const data = {
      ...req.body,
      user_id: uuid.v4(),
    };
    let sql2 = "INSERT INTO users SET ?";
    const result = await db(sql2, data);
    const value = {
      data: {},
    };
    if (result) {
      value.data.status = 200;
      value.data.statusText = "添加用户成功";
      return res.status(200).json(value);
    } else {
      value.data.statusText = "添加用户失败";
      return res.status(500).json(value);
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteUserInfo = async function (req, res, next) {
  try {
    const sql = "delete from users where user_id = ?";
    const ret = await db(sql, req.params.id);
    const value = { data: {} };
    if (ret) {
      value.data.status = 200;
      value.data.statusText = "删除用户成功";
      return res.status(200).json(value);
    } else {
      value.data.statusText = "添加用户失败";
      return res.status(500).json(value);
    }
  } catch (err) {
    next(err);
  }
};

exports.updateUserInfo = async function (req, res, next) {
  try {
    let sql =
      "update users set username = ?, sex = ?, password = ?, phone = ?, email = ?, create_time = ? where user_id = ?";
    let sqlArr = [
      req.body.username,
      req.body.sex,
      req.body.password,
      req.body.phone,
      req.body.email,
      req.body.create_time,
      req.params.id,
    ];
    const result = await db(sql, sqlArr);
    const value = { data: {} };
    if (result) {
      value.data.status = 200;
      value.data.statusText = "更改用户信息成功";
      return res.status(200).json(value);
    } else {
      value.data.statusText = "更新用户信息失败";
      return res.status(500).json(value);
    }
  } catch (err) {
    next(err);
  }
};
