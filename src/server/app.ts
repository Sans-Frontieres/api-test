import express from "express";
import morgan from "morgan";
import { Paths, tasksRouter, authRouter } from "../routes";
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

app.use(Paths.TASKS, tasksRouter);

app.use(Paths.AUTH, authRouter);

app.use(Paths.DOCS, swaggerUI.serve, swaggerUI.setup(specs))

app.use(Paths.ROOT, (req, res, next) => {
  res.status(200).json({ message: "Respuesta al navegador" });
});


export default app;
