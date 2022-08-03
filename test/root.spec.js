const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { api, server } = require("./setup");

describe("Prueba básica de la API-REST. - (Unitary)", () => {
  it("La api retorna un código de estado 200.", async () => {
    const response = await api.get("/api/v1");

    expect(response).to.have.status(200);
  });

  it("La api retorna un mensaje.", async () => {
    const response = await api.get("/api/v1");

    expect(response.body.message).to.not.be.undefined;
  });

  it("La api retorna un código de estado 200 con el uso del done.", (done) => {
    api.get("/api/v1").expect(200);
    done();
  });
});

after((done) => {
  server.close();
  done();
});
