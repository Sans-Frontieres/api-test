const supertest = require("supertest");
const { server, app } = require("../../src/server");

const api = supertest(app);

const task = {
  title: "Tarea de prueba.",
  description: "Tarea creada para los test de Mocha y Chai.",
};

module.exports = { api, server, task };
