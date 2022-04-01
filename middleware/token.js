const { verify } = require("../utils/jwt");
const { jwtSecret } = require("../config/config.default");
const { db } = require("../utils/db");
module.exports = async (req, res, next) => {
  let token = req.headers["authorization"];
  console.log(token, "headers");
  token = token ? token.split("Bearer ")[1] : null;
  console.log(token);
  if (!token) {
    console.log(1111)
    return res.status(401).send({ status: 401, message: "没有权限" });
  }
  try {
    const decodedToken = await verify(token, jwtSecret);
    console.log(decodedToken, "decodedToken");
    req.user = await db("select * from users where username = ?", [
      decodedToken.userId,
    ]);
    next();
  } catch (err) {
    console.log(2222)
    return res.status(401).send({ status: 401, message: "没有权限" });
  }
};
