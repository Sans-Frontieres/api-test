import { api } from "../setup";

describe("Prueba básica de la API-REST. - (Unitary)", () => {
  it("La api retorna un código de estado 200.", async () => {
    const response = await api.get("/api/v1");

    expect(response.status).toBe(200);
  });

  it("La api retorna un mensaje.", async () => {
    const response = await api.get("/api/v1");

    expect(response.body.message).toBeDefined();
  });

  it("La api retorna un código de estado 200 con el uso del done.", (done) => {
    api.get("/api/v1").expect(200);
    done();
  });
});
