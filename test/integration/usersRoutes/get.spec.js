import { api, Paths, resetDatabase, userNiko } from "../../setup";

beforeEach(async () => {
  await resetDatabase();
});

describe(`GET "${Paths.USERS}" busqueda de usuarios. - (Integration)`, () => {
  it("No hay usuarios almacenadaas recibimos un status 200 y un array vacio.", async () => {
    const response = await api.get(Paths.USERS);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(0);
  });

  it("El usuario buscado no se encuentra recibimos un status 404.", async () => {
    const response = await api.get(`${Paths.USERS}/id-inexistente`);

    expect(response.status).toEqual(404);
    expect(response.body.message).toBeDefined();
  });

  it("Busqueda de un usuario por ID recibimos un status 200 y el usuario.", async () => {
    const result = await api.post(`${Paths.AUTH}/signup`).send(userNiko);
    const id = result.body.id;

    const response = await api.get(`${Paths.USERS}/${id}`);

    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
  });
});

afterAll(async () => {
  await resetDatabase();
});
