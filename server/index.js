var express = require("express");
var parser = require("body-parser");
var app = express();
var port = 3100;
const router = require("./router");
var path = require("path");

// Middleware
app.use(parser.json());

//test

app.use("/", router);

app.use(express.static(path.join(__dirname, "../public")));
//SET UP ROUTER

// Routes

app.listen(port, () => {
  console.log("Listening on port: ", port);
});
