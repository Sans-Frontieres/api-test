import { api, Paths, resetDatabase, task, userNiko } from "../../setup";

let token;

beforeEach(async () => {
  await resetDatabase();

  await api.post(`${Paths.AUTH}/singup`).send(userNiko);

  const response = await api.post(`${Paths.AUTH}/login`).send({
    email: userNiko.email,
    password: userNiko.password,
  });

  token = response.body.token;
});

describe.skip(`DELETE "${Paths.TASKS}" eliminación de tareas. - (Integration)`, () => {
  it("La eliminación exitosa devuelve el ID y un status 202.", async () => {
    const result = await api
      .post(Paths.TASKS)
      .send(task)
      .set("Authorization", token)
      .expect("Content-Type", /application\/json/);

    const response = await api
      .delete(`${Paths.TASKS}/${result.body.id}`)
      .set("Authorization", token);

    expect(response.body.id).toEqual(result.body.id);
    expect(response.status).toEqual(202);
  });

  it("Se intenta eliminar una tarea inexistente recibimos un mensaje de error y status 404.", async () => {
    const response = await api
      .delete(`${Paths.TASKS}/ffff-000-ffff`)
      .set("Authorization", token)
      .expect(404);

    expect(response.body.message).toBeDefined();
  });
});

afterAll(async () => {
  await resetDatabase();
});
