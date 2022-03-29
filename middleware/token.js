const { verify } = require("../utils/jwt");
const { jwtSecret } = require("../config/config.default");
const { db } = require("../utils/db");
module.exports = async (req, res, next) => {
  let token = req.headers["authorization"];
  console.log(token, "headers");
  token = token ? token.split("Bearer ")[1] : null;
  console.log(token)
  if (!token) {
    return res.status(401).send("没有权限");
  }
  try {
    console.log(111);
    const decodedToken = await verify(token, jwtSecret);
    console.log(222)
    console.log(decodedToken, "decodedToken");
    req.user = await db("select * from users where username = ?", [
      decodedToken.userId,
    ]);
    next();
  } catch (err) {
    return res.status(401).send("没有权限");
  }
};
