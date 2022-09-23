import "./config";
import express from "express";
import cors from 'cors'
import morgan from "morgan";
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import { options } from './swaggerOptions'
import { Paths, tasksRouter, authRouter } from "../routes";
import { createConnection } from "./db";

const specs = swaggerJsDoc(options)

const app = express();

app.use(cors({ origin: '*' }))

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use(Paths.TASKS, tasksRouter);

app.use(Paths.AUTH, authRouter);

app.use(Paths.DOCS, swaggerUI.serve, swaggerUI.setup(specs))

app.use(Paths.ROOT, (_, res) => {
  res.status(200).json({ message: "Respuesta desde la API REST de Tareas!!!" });
});

createConnection();

export default app;
