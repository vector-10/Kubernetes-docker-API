require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    message: "This is a test",
  });
});

const PORT = 4000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is listening on PORT &{PORT}`);
});
