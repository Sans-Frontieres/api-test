const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const { resetDatabase } = require("../../src/server/db");
chai.use(chaiHttp);
const { server, api, task } = require("../setup");

beforeEach((done) => {
  resetDatabase();
  done();
});

describe('PUT "tasks/:id" actualización de tareas. - (Integration)', () => {
  it("Al actualizar correctamente una tarea recibimos un status 200.", async () => {
    const result = await api.post("/api/v1/tasks/").send(task);

    const response = await api
      .put(`/api/v1/tasks/${result.body}`)
      .send({ title: "Titulo actualizado." });

    expect(response).to.have.status(200);
  });

  it("Se actualiza el titulo de la tarea guardada.", async () => {
    const task_1 = {
      title: "Tarea a actiualizar",
      description: "Esto es una descripción.",
    };
    const result = await api.post("/api/v1/tasks/").send(task_1);
    const id = result.body;
    const taskResult = await api.get(`/api/v1/tasks/${id}`);

    expect(taskResult.body.title).to.equal(task_1.title);

    await api.put(`/api/v1/tasks/${id}`).send({ title: "Titulo actualizado." });

    const response = await api.get(`/api/v1/tasks/${id}`);

    expect(response.body.title).to.equal("Titulo actualizado.");
  });

  it("Al actualizar correctamente una tarea recibimos un ID.", async () => {
    const result = await api.post("/api/v1/tasks/").send({
      title: "Tarea a actiualizar",
      description: "Esto es una descripción.",
    });

    const response = await api
      .put(`/api/v1/tasks/${result.body}`)
      .send({ title: "Titulo actualizado." });

    expect(response.body.id).to.not.be.undefined;
  });

  it("Se intenta actualizar una tarea inexistente, recibimos un status 404 y un message.", async () => {
    const response = await api
      .put("/api/v1/tasks/id-inexistente")
      .send({ title: "Titulo actualizado." });

    expect(response).to.have.status(404);
    expect(response.body.message).to.not.be.undefined;
  });
});

after((done) => {
  resetDatabase();
  server.close();
  done();
});
