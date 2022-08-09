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

describe('GET "tasks/:id" Busqueda de tareas por ID. - (Integration)', () => {
  it("Si la tarea no existe retorna un status 404", async () => {
    const idInexistente = "jhgf-9087-456247-hahal";
    const response = await api.get(`/api/v1/tasks/${idInexistente}`);

    expect(response).to.have.status(404);
  });

  it("Si la tarea no existe retorna un mensage de error.", async () => {
    const idInexistente = "jhgf-9087-456247-hahal";

    const response = await api.get(`/api/v1/tasks/${idInexistente}`);

    expect(response.body.message).to.not.be.undefined;
  });

  it("Si la tarea existe retorna un status 200.", async () => {
    const result = await api.post("/api/v1/tasks/").send(task);
    const id = result.body;

    const response = await api.get(`/api/v1/tasks/${id}`);

    expect(response).to.have.status(200);
  });

  it("Si la tarea existe es devuelta dentro del body.", async () => {
    const result = await api.post("/api/v1/tasks/").send(task);
    const id = result.body;

    const response = await api.get(`/api/v1/tasks/${id}`);

    expect(response.body).to.not.be.undefined;
    expect(response.body.id).to.equal(id);
  });
});

after((done) => {
  resetDatabase();
  server.close();
  done();
});
