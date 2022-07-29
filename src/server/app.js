// import express from 'express'
const express = require("express");
const morgan = require("morgan");
const tasksRoutes = require("../routes/tasks.routes");

const app = express();

app.use(express.json());

//para solicitud de obj entrantes
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use("/api/v1/tasks", tasksRoutes);

// app.use("/api/v1", (__, res) => {
//   res.status(200).json({ data: "Respuesta al navegador" });
// });

module.exports = app;
// export default app
