import { api, resetDatabase, task } from "../setup";

beforeEach((done) => {
  resetDatabase();
  done();
});

describe('DELETE "tasks/:id" eliminación de tareas. - (Integration)', () => {
  it("Si la tarea a eliminar no existe la api retorna un código de estado 404.", async () => {
    const idInexistente = "JDHGF-453278-GHAGAGA";

    const response = await api.delete(`/api/v1/tasks/${idInexistente}`);

    expect(response.status).toBe(404);
  });

  it("Si la tarea a eliminar no existe la api retorna un mensaje de error.", async () => {
    const idInexistente = "JDHGF-453278-GHAGAGA";

    const response = await api.delete(`/api/v1/tasks/${idInexistente}`);

    expect(response.body.message).toBeDefined();
  });

  it("Al eliminar una tarea obtenemos un status 202.", async () => {
    const result = await api.post("/api/v1/tasks/").send(task);
    const id = result.body;

    const response = await api.delete(`/api/v1/tasks/${id}`);

    expect(response.status).toBe(202);
  });

  it("Al eliminar una tarea correctamente obtenemos el ID.", async () => {
    const result = await api.post("/api/v1/tasks/").send(task);
    const id = result.body;

    const response = await api.delete(`/api/v1/tasks/${id}`);

    expect(response.body).toBeDefined();
    expect(response.body).toEqual(id);
  });
});

afterAll((done) => {
  resetDatabase();
  done();
});
