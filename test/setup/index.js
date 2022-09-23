import supertest from "supertest";
import app from "../../src/server/app";
import { resetDatabase } from "../../src/server/db";
import { Paths } from "../../src/routes";

const api = supertest(app);

const task = {
  title: "Tarea de prueba.",
  description: "Tarea creada para los test de Mocha y Chai.",
};

export { api, Paths, resetDatabase, task };
