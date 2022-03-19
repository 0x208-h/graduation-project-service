const express = require("express");

const errHandler = require("./middleware/err-handle");
const routers = require("./routers")

const app = express();

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("ddd");
});

app.use('/api', routers)

app.use(errHandler());

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
