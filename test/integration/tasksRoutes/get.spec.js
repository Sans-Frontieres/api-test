import { api, Paths, resetDatabase, task } from "../../setup";

beforeEach((done) => {
  resetDatabase();
  done();
});

const uri = Paths.TASKS;

describe(`GET "${uri}" lista de tareas. - (Integration)`, () => {
  it("La api retorna un status 200", async () => {
    const response = await api.get(uri);

    expect(response.status).toBe(200);
  });

  it("La api retorna retorna un array vacio cuando no hay tareas.", async () => {
    const response = await api.get(uri);

    expect(response.body.tasks).toBeDefined();
    expect(response.body.count).toEqual(0);
  });

  it("La api retorna una tarea almacenada.", async () => {
    await api.post(uri).send(task);

    const response = await api.get(uri);

    expect(response.body.tasks).toBeDefined();
    expect(response.body.count).toEqual(1);
  });
});

describe('GET "tasks/count" cantidad de tareas. - (Integration)', () => {
  it("La api retorna un status 200", async () => {
    const response = await api.get(`${uri}/count`);

    expect(response.status).toBe(200);
  });

  it("La cantidad de tareas almacenadas es 0.", async () => {
    const response = await api.get(`${uri}/count`);

    expect(response.body.count).toEqual(0);
  });

  it("Hay una tarea almacenada.", async () => {
    await api.post(uri).send(task);

    const response = await api.get(uri);

    expect(response.body.count).toEqual(1);
  });
});

describe('GET "tasks/:id" Busqueda de tareas por ID. - (Integration)', () => {
  it("Si la tarea no existe retorna un status 404", async () => {
    const idInexistente = "jhgf-9087-456247-hahal";
    const response = await api.get(`${uri}/${idInexistente}`);

    expect(response.status).toBe(404);
  });

  it("Si la tarea no existe retorna un mensage de error.", async () => {
    const idInexistente = "jhgf-9087-456247-hahal";

    const response = await api.get(`${uri}/${idInexistente}`);

    expect(response.body.message).toBeDefined();
  });

  it("Si la tarea existe retorna un status 200.", async () => {
    const result = await api.post(uri).send(task);
    const id = result.body;

    const response = await api.get(`${uri}/${id}`);

    expect(response.status).toBe(200);
  });

  it("Si la tarea existe es devuelta dentro del body.", async () => {
    const result = await api.post(uri).send(task);
    const id = result.body;

    const response = await api.get(`${uri}/${id}`);

    expect(response.body).toBeDefined();
    expect(response.body.id).toEqual(id);
  });
});

afterAll((done) => {
  resetDatabase();
  done();
});
