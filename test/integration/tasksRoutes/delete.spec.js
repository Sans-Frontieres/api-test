import { api, Paths, resetDatabase, task } from "../../setup";

beforeEach((done) => {
  resetDatabase();
  done();
});

const uri = Paths.TASKS;

describe(`DELETE ${uri} eliminación de tareas. - (Integration)`, () => {
  it("Si la tarea a eliminar no existe la api retorna un código de estado 404.", async () => {
    const idInexistente = "JDHGF-453278-GHAGAGA";

    const response = await api.delete(`${uri}/${idInexistente}`);

    expect(response.status).toBe(404);
  });

  it("Si la tarea a eliminar no existe la api retorna un mensaje de error.", async () => {
    const idInexistente = "JDHGF-453278-GHAGAGA";

    const response = await api.delete(`${uri}/${idInexistente}`);

    expect(response.body.message).toBeDefined();
  });

  it("Al eliminar una tarea obtenemos un status 202.", async () => {
    const result = await api.post("${uri}/").send(task);
    const id = result.body;

    const response = await api.delete(`${uri}/${id}`);

    expect(response.status).toBe(202);
  });

  it("Al eliminar una tarea correctamente obtenemos el ID.", async () => {
    const result = await api.post("${uri}/").send(task);
    const id = result.body;

    const response = await api.delete(`${uri}/${id}`);

    expect(response.body).toBeDefined();
    expect(response.body).toEqual(id);
  });
});

afterAll((done) => {
  resetDatabase();
  done();
});
