"use strict";

var app = require("./app");

var _require = require("./db"),
    createConnection = _require.createConnection;

createConnection();
app.listen(4000, function () {
  console.log("Server run on port 4000");
});