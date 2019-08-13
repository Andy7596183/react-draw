const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
// middlewares
app.set(cors());
app.set(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    msg: "success"
  });
});

app.listen("3000", () => console.log("Listening on port 3000..."));
