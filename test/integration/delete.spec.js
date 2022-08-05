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

describe('DELETE "tasks/:id" eliminación de tareas. - (Integration)', () => {
  it("Si la tarea a eliminar no existe la api retorna un código de estado 404.", async () => {
    const idInexistente = "JDHGF-453278-GHAGAGA";

    const response = await api.delete(`/api/v1/tasks/${idInexistente}`);

    expect(response).to.have.status(404);
  });

  it("Si la tarea a eliminar no existe la api retorna un mensaje de error.", async () => {
    const idInexistente = "JDHGF-453278-GHAGAGA";

    const response = await api.delete(`/api/v1/tasks/${idInexistente}`);

    expect(response.body.message).to.not.be.undefined;
  });

  it("Al eliminar una tarea obtenemos un status 202.", async () => {
    const result = await api.post("/api/v1/tasks/").send(task);
    const id = result.body;

    const response = await api.delete(`/api/v1/tasks/${id}`);

    expect(response).to.have.status(202);
  });

  it("Al eliminar una tarea correctamente obtenemos el ID.", async () => {
    const result = await api.post("/api/v1/tasks/").send(task);
    const id = result.body;

    const response = await api.delete(`/api/v1/tasks/${id}`);

    expect(response.body).to.not.be.undefined;
    expect(response.body).to.equal(id);
  });
});

after((done) => {
  resetDatabase();
  server.close();
  done();
});
