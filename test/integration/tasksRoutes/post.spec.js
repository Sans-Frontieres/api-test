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

describe.skip(`POST "${Paths.TASKS}" inserción de nuevas tareas. - (Integration)`, () => {
  it("La creación exitosa de una tarea nos devuelve status 200.", async () => {
    const response = await api
      .post(Paths.TASKS)
      .send(task_1)
      .set("Authorization", validToken)
      .expect("Content-Type", /application\/json/);

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
  });

  it("Creación exitosa recibimos el ID de la tarea y el ID del usuario autor.", async () => {
    const response = await api
      .post(Paths.TASKS)
      .send(task_1)
      .set("Authorization", validToken)
      .expect("Content-Type", /application\/json/);

    expect(response.body.id).toBeDefined();
    expect(response.body.idUser).toBeDefined();
  });

  it("Si el esquema no pasa la validación de datos se recibirá status 422 y un error.", async () => {
    const response = await api
      .post(Paths.TASKS)
      .send({
        title: "",
        description: "Esta tarea no sera creada por falta de datos.",
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
