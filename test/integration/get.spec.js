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

describe('GET "tasks/" lista de tareas. - (Integration)', () => {
  it("La api retorna un status 200", async () => {
    const response = await api.get("/api/v1/tasks/");

    expect(response).to.have.status(200);
  });

  it("La api retorna retorna un array vacio cuando no hay tareas.", async () => {
    const response = await api.get("/api/v1/tasks/");

    expect(response.body.tasks).to.be.an("array");
    expect(response.body).to.not.be.undefined;
    expect(response.body.count).to.equal(0);
  });

  it("La api retorna una tarea almacenada.", async () => {
    await api.post("/api/v1/tasks/").send(task);

    const response = await api.get("/api/v1/tasks/");

    expect(response.body.count).to.equal(1);
    expect(response.body.tasks.length).to.equal(1);
  });
});

describe('GET "tasks/count" cantidad de tareas. - (Integration)', () => {
  it("La api retorna un status 200", async () => {
    const response = await api.get("/api/v1/tasks/count");

    expect(response).to.have.status(200);
  });

  it("La cantidad de tareas almacenadas es 0.", async () => {
    const response = await api.get("/api/v1/tasks/count");

    expect(response.body.count).to.equal(0);
  });

  it("Hay una tarea almacenada.", async () => {
    await api.post("/api/v1/tasks/").send(task);

    const response = await api.get("/api/v1/tasks/");

    expect(response.body.count).to.equal(1);
  });
});

after((done) => {
  resetDatabase();
  server.close();
  done();
});
