import express from "express";
import morgan from "morgan";
import tasksRoutes from "../routes/tasks.routes.js";

const app = express();

app.use(express.json());

//para solicitud de obj entrantes
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use("/api/v1/tasks", tasksRoutes);

app.use("/api/v1", (req, res, next) => {
  res.status(200).json({ message: "Respuesta al navegador" });
});

export default app;
