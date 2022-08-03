"use strict";

// import express from 'express'
var express = require("express");

var morgan = require("morgan");

var tasksRoutes = require("../routes/tasks.routes");

var app = express();
app.use(express.json()); //para solicitud de obj entrantes

app.use(express.urlencoded({
  extended: false
}));
app.use(morgan("dev"));
app.use("/api/v1/tasks", tasksRoutes);
app.use("/api/v1", function (__, res) {
  res.status(200).json({
    message: "Respuesta al navegador"
  });
});
module.exports = app; // export default app