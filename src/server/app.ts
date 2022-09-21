import express from "express";
import morgan from "morgan";
import tasksRoutes from "../routes/tasks.routes";
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import { options } from './swaggerOptions'
import cors from 'cors'

const app = express();

app.use(cors({ origin: '*' }))

app.use(express.json());

//para solicitud de obj entrantes
app.use(express.urlencoded({ extended: false }));

const specs = swaggerJsDoc(options)

app.use(morgan("dev"));

app.use("/api/v1/tasks", tasksRoutes);

app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(specs))

app.use("/api/v1", (req, res, next) => {
  res.status(200).json({ message: "Respuesta al navegador" });
});


export default app;
