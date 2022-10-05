import supertest from "supertest";
import app from "../../src/server/app";
import { User } from "../../src/models";
import { resetDatabase } from "../../src/server/database";
import { Paths } from "../../src/routes";
import Roles from "../../src/enum";

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

export { api, Paths, User, resetDatabase, task, userNiko, Roles };
