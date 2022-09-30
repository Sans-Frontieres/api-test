import { api, Paths, resetDatabase, task_1, userNiko } from "../../setup";

let validToken;

beforeAll(async () => {
  await api.post(`${Paths.AUTH}/signup`).send(userNiko);
  const response = await api.post(`${Paths.AUTH}/login`).send({
    email: userNiko.email,
    password: userNiko.password,
  });
  validToken = response.body.token;
});

beforeEach(async () => {
  await resetDatabase();
});

describe(`DELETE "${Paths.TASKS}" eliminación de tareas. - (Integration)`, () => {
  it("La eliminación exitosa devuelve el ID y un status 202.", async () => {
    const result = await api
      .post(Paths.TASKS)
      .send(task_1)
      .set("Authorization", validToken)
      .expect("Content-Type", /application\/json/);

    const taskFound = result.body;

    const response = await api
      .delete(`${Paths.TASKS}/${taskFound.id}`)
      .set("Authorization", validToken);

    expect(response.body.id).toEqual(taskFound.id);
    expect(response.status).toEqual(202);
  });

  it.skip("Se intenta eliminar una tarea inexistente recibimos un mensaje de error y status 404.", async () => {
    const id = "ffff-000-ffff";
    const response = await api
      .delete(`${Paths.TASKS}/${id}`)
      .set("Authorization", validToken)
      .expect(404);

    expect(response.body.message).toBeDefined();
  });
});

afterAll(async () => {
  await resetDatabase();
});
