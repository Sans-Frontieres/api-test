import { api, Paths, resetDatabase } from "../../setup";

beforeEach(async () => {
  await resetDatabase();
});

describe.skip(`POST "${Paths.AUTH}" alta de un nuevo usuario. - (Integration)`, () => {
  it("Cuando se de alta correctamente un usuario obtenemos el id como respuesta.", async () => {
    const response = await api
      .post(`${Paths.AUTH}/signup`)
      .send({
        username: "nikodev",
        email: "nikolas090189@gmail.com",
        password: "miContraseña1234",
      })
      .expect("Content-Type", /application\/json/);

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
  });

  it("Si el esquema no pasa la validación de datos se recibirá status 422 y un error.", async () => {
    const response = await api
      .post(`${Paths.AUTH}/signup`)
      .send({
        username: "nikodev",
        email: "nikolas090189@gmail.com",
        password: "12",
      })
      .expect("Content-Type", /application\/json/);

    expect(response.status).toBe(422);
    expect(response.body.error).toBeDefined();
  });

  it("Se intenta registrar un username existente recibe un status 400 y un mensaje de error.", async () => {
    await api
      .post(`${Paths.AUTH}/signup`)
      .send({
        username: "nikodev",
        email: "nikolas090189@gmail.com",
        password: "1234",
      })
      .expect("Content-Type", /application\/json/)
      .expect(201);

    const response = await api.post(`${Paths.AUTH}/signup`).send({
      username: "nikodev",
      email: "example@gmail.com",
      password: "1234",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("Se intenta registrar un email existente recibe un status 400 y un mensaje de error.", async () => {
    await api
      .post(`${Paths.AUTH}/signup`)
      .send({
        username: "nikodev",
        email: "nikolas090189@gmail.com",
        password: "1234",
      })
      .expect("Content-Type", /application\/json/)
      .expect(201);

    const response = await api.post(`${Paths.AUTH}/signup`).send({
      username: "newNick",
      email: "nikolas090189@gmail.com",
      password: "1234",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});

afterAll(async () => {
  await resetDatabase();
});
