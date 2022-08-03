const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { server, api } = require("../setup");

describe('GET "/api/v1/tasks" lista de tareas.', () => {
  it("La api retorna la cantidad de tareas", async () => {
    const response = await api.get("/api/v1/tasks");

    expect(response.body.count).to.equal(2);
  });
});

after((done) => {
  server.close();
  done();
});
