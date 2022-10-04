import "./config";
import express from "express";
import cors from 'cors'
import morgan from "morgan";
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import { options } from './swaggerOptions'
import { Paths, tasksRouter, authRouter, usersRouter } from "../routes";
import { createConnection } from "./database";
import { sendParam } from "../middlewares/sendParam";

const specs = swaggerJsDoc(options)

const app = express();

app.use(cors({ origin: '*' }))

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use(Paths.TASKS, tasksRouter);

app.use(Paths.AUTH, authRouter);

app.use(Paths.USERS, usersRouter)

app.use(Paths.DOCS, swaggerUI.serve, swaggerUI.setup(specs))

app.get(Paths.ROOT, sendParam, (req, res) => {
  res.json({ message: req.params.message, method: res.locals.method })
});

createConnection();

export default app;
