import { api, resetDatabase, task } from "../setup";

beforeEach((done) => {
  resetDatabase();
  done();
});

describe('GET "tasks/" lista de tareas. - (Integration)', () => {
  it("La api retorna un status 200", async () => {
    const response = await api.get("/api/v1/tasks/");

    expect(response.status).toBe(200);
  });

  it("La api retorna retorna un array vacio de tareas cuando la cantidad es 0.", async () => {
    const response = await api.get("/api/v1/tasks/");

    expect(response.body.tasks).toBeDefined();
    expect(response.body.count).toEqual(0);
  });

  it("La api retorna una tarea almacenada.", async () => {
    await api.post("/api/v1/tasks/").send(task);

    const response = await api.get("/api/v1/tasks/");

    expect(response.body.tasks).toBeDefined();
    expect(response.body.count).toEqual(1);
  });
});

describe('GET "tasks/count" cantidad de tareas. - (Integration)', () => {
  it("La api retorna un status 200", async () => {
    const response = await api.get("/api/v1/tasks/count");

    expect(response.status).toBe(200);
  });

  it("La cantidad de tareas almacenadas es 0.", async () => {
    const response = await api.get("/api/v1/tasks/count");

    expect(response.body.count).toEqual(0);
  });

  it("Hay una tarea almacenada.", async () => {
    await api.post("/api/v1/tasks/").send(task);

    const response = await api.get("/api/v1/tasks/count");

    expect(response.body.count).toEqual(1);
  });
});

describe('GET "tasks/:id" Busqueda de tareas por ID. - (Integration)', () => {
  it("Si la tarea no existe retorna un status 404.", async () => {
    const idInexistente = "jhgf-9087-456247-hahal";
    const response = await api.get(`/api/v1/tasks/${idInexistente}`);

    expect(response.status).toBe(404);
  });

  it("Si la tarea no existe retorna un mensage de error.", async () => {
    const idInexistente = "jhgf-9087-456247-hahal";

    const response = await api.get(`/api/v1/tasks/${idInexistente}`);

    expect(response.body.message).toBeDefined();
  });

  it("Si la tarea existe retorna un status 200.", async () => {
    const result = await api.post("/api/v1/tasks/").send(task);
    const id = result.body;

    const response = await api.get(`/api/v1/tasks/${id}`);

    expect(response.status).toBe(200);
  });

  it("Si la tarea existe es devuelta dentro del body.", async () => {
    const result = await api.post("/api/v1/tasks/").send(task);
    const id = result.body;

    const response = await api.get(`/api/v1/tasks/${id}`);

    expect(response.body).toBeDefined();
    expect(response.body.id).toEqual(id);
  });
});

afterAll((done) => {
  resetDatabase();
  done();
});
