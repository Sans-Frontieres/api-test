import supertest from "supertest";
import app from "../../src/server/app";
import { User } from "../../src/model";
import { resetDatabase } from "../../src/server/db";
import { Paths } from "../../src/routes";

const api = supertest(app);

const task = {
  title: "Tarea de prueba.",
  description: "Tarea creada para los test de Mocha y Chai.",
};

const userNiko = {
  username: "nikodev",
  email: "nikolas090189@gmail.com",
  password: "miContraseña1234",
};

export { api, Paths, User, resetDatabase, task, userNiko };
