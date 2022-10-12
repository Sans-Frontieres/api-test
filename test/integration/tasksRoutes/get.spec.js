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

describe.skip(`GET "${Paths.TASKS}" busqueda de tareas existentes. - (Integration)`, () => {
  it("No hay tareas almacenadaas, el servicio nos retorna status 200.", async () => {
    const response = await api.get(Paths.TASKS);

    expect(response.status).toEqual(200);
    expect(response.body.tasks).toHaveLength(0);
    expect(response.body.count).toEqual(0);
  });

  it("El endpoint devuelve las tareas almacenadas y un status 200.", async () => {
    await api.post(Paths.TASKS).send(task).set("Authorization", token);

    const response = await api.get(Paths.TASKS);

    expect(response.status).toEqual(200);
    expect(response.body.tasks).toHaveLength(1);
    expect(response.body.count).toEqual(1);
  });
});

describe.skip(`GET "${Paths.TASKS}/count" catidad de tareas almacenadas. - (Integration)`, () => {
  it("El endpoint nos devuelve la cantidad de tareas almacenadas y status 200.", async () => {
    let response = await api.get(`${Paths.TASKS}/count`);
    expect(response.body.count).toEqual(0);

    await api.post(Paths.TASKS).set("Authorization", token).send(task);

    response = await api.get(`${Paths.TASKS}/count`);

    expect(response.status).toEqual(200);
    expect(response.body.count).toEqual(1);
  });
});

describe.skip(`GET "${Paths.TASKS}/:id" Busqueda de tareas por id. - (Integration)`, () => {
  it("Busqueda exitosa de una tarea, obtenemos la tarea y un status 200", async () => {
    const result = await api
      .post(Paths.TASKS)
      .set("Authorization", token)
      .send(task);
    const id = result.body.id;

    const response = await api.get(`${Paths.TASKS}/${id}`);

    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toEqual(id);
  });

  it("Busqueda de una tarea inexistente, obtenemos un mensaje de error y un status 404.", async () => {
    const response = await api.get(`${Paths.TASKS}/1112-dfg-333`);

    expect(response.status).toEqual(404);
    expect(response.body.message).toBeDefined();
  });
});

afterAll(async () => {
  await resetDatabase();
});
