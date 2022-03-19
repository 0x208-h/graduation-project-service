const util = require("util");

module.exports = () => {
  return (err, req, res, next) => {
    //  错误信息在err对象的原型上， 需要将其转化为字符串
    res.status(500).send({ err: util.format(err) });
  };
};