import { api, resetDatabase, task } from "../setup";

beforeEach((done) => {
  resetDatabase();
  done();
});

describe('POST "tasks/" creación de tareas. - (Integration)', () => {
  it("La creación exitosa devuelve un código de estado 201.", async () => {
    const response = await api.post("/api/v1/tasks/").send(task);
    console.log("Respuesta: ", response.body);
    expect(response.status).toBe(201);
  });

  it("La creación exitosa devuelve un ID.", async () => {
    const response = await api.post("/api/v1/tasks/").send(task);

    expect(response.body).toBeDefined();
  });
});

afterAll((done) => {
  resetDatabase();
  done();
});
