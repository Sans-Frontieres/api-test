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

describe.skip(`POST "${Paths.TASKS}" inserción de nuevas tareas. - (Integration)`, () => {
  it("La creación exitosa de una tarea nos devuelve status 201.", async () => {
    const response = await api
      .post(Paths.TASKS)
      .send(task)
      .set("Authorization", token)
      .expect("Content-Type", /application\/json/);

    expect(response.status).toBe(201);
  });

  it("Creación exitosa recibimos el ID de la tarea.", async () => {
    const response = await api
      .post(Paths.TASKS)
      .send(task)
      .set("Authorization", token)
      .expect("Content-Type", /application\/json/);

    expect(response.body.id).toBeDefined();
  });

  it("La tarea creada se asocia al ID del author.", async () => {
    const response = await api
      .post(Paths.TASKS)
      .send(task_1)
      .set("Authorization", validToken);
    const userId = response.body.idUser;
    const taskId = response.body.id;

    const result = await api.get(`${Paths.TASKS}/${taskId}`);

    expect(result.body.author_id).toEqual(userId);
    expect(await Task.isAuthor(userId, taskId)).toBeTruthy();
    expect(await Task.isAuthor("ID-de-otro-autor", taskId)).toBeFalsy();
  });

  it("Si el esquema no pasa la validación de datos se recibirá status 422 y un error.", async () => {
    const response = await api
      .post(Paths.TASKS)
      .send({
        title: "",
        description: "Esta tarea no sera creada por falta de datos.",
      })
      .set("Authorization", token)
      .expect("Content-Type", /application\/json/);

    expect(response.status).toBe(422);
    expect(response.body.error).toBeDefined();
  });
});

afterAll(async () => {
  await resetDatabase();
});
