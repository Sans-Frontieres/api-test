import { api, Paths, resetDatabase, task_1, userNiko } from "../../setup";

let validToken;

beforeAll(async () => {
  await api.post(`${Paths.AUTH}/singup`).send(userNiko);
  const response = await api.post(`${Paths.AUTH}/login`).send({
    email: userNiko.email,
    password: userNiko.password,
  });
  validToken = response.body.token;
});

beforeEach(async () => {
  await resetDatabase();
});

describe.skip(`PUT "${Paths.TASKS}/:id" actualización de tareas. - (Integration)`, () => {
  it("La actualización exitosa de una tarea nos devuelve status 200.", async () => {
    const result = await api
      .post(Paths.TASKS)
      .send(task_1)
      .set("Authorization", validToken)
      .expect("Content-Type", /application\/json/);
    const taskFound = result.body;

    const response = await api
      .put(`${Paths.TASKS}/${taskFound.id}`)
      .send({ title: "Titulo actualizado", description: "Nueva descripción." })
      .set("Authorization", validToken)
      .expect("Content-Type", /application\/json/)
      .expect(200);

    expect(response.body.id).toEqual(taskFound.id);
  });

  it("Se intenta actualizar una tarea inexistente recibimos un mensaje de error y status 404.", async () => {
    const response = await api
      .put(`${Paths.TASKS}/gghhh-1111-ffrff`)
      .send({
        title: "Un titulo",
        description: "Esto no será tomado en cuenta.",
      })
      .set("Authorization", validToken)
      .expect("Content-Type", /application\/json/)
      .expect(404);

    expect(response.body.message).toBeDefined();
  });

  it("Si el esquema no pasa la validación de datos se recibirá status 422 y un error.", async () => {
    const result = await api
      .post(Paths.TASKS)
      .send(task_1)
      .set("Authorization", validToken)
      .expect("Content-Type", /application\/json/);
    const taskFound = result.body;

    const response = await api
      .put(`${Paths.TASKS}/${taskFound.id}`)
      .send({
        title: "",
        description: "Esta tarea no será actualizada por falta de datos.",
      })
      .set("Authorization", validToken)
      .expect("Content-Type", /application\/json/);

    expect(response.status).toBe(422);
    expect(response.body.error).toBeDefined();
  });
});

afterAll(async () => {
  await resetDatabase();
});
