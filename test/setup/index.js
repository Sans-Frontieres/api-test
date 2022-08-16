import supertest from "supertest";
import app from "../../src/server";
import { resetDatabase } from "../../src/server/db";

const api = supertest(app);

const task = {
  title: "Tarea de prueba.",
  description: "Tarea creada para los test de Mocha y Chai.",
};

export { api, resetDatabase, task };
