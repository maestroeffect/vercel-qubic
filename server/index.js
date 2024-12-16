const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("Server is listening");
});

app.listen(5000, console.log("Server is listening on port 5000"));
