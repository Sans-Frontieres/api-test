import { api, Paths } from "../../setup";

const uri = Paths.ROOT;

describe(`Prueba básica de la API-REST ruta ${uri}. - (Unitary)`, () => {
  it("La api retorna un código de estado 200.", async () => {
    const response = await api.get(uri);

    expect(response.status).toBe(200);
  });

  it("La api retorna un mensaje.", async () => {
    const response = await api.get(uri);

    expect(response.body.message).toBeDefined();
  });

  it("La api retorna un código de estado 200 con el uso del done.", (done) => {
    api.get(uri).expect(200);
    done();
  });
});
