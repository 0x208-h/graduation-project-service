const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const errHandler = require("./middleware/err-handle");
const routers = require("./routers");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 8080;

app.use("/api", routers);

app.use(errHandler());

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
