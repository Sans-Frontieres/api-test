import { api, Paths, resetDatabase } from "../../setup";

beforeEach(async () => {
  await resetDatabase();
});

describe(`POST "${Paths.AUTH}" login de un usuario. - (Integration)`, () => {
  it("Cuando un usuario se loguea correctamente obtenemos un token.", async () => {
    await api.post(`${Paths.AUTH}/signup`).send({
      username: "nikodev",
      email: "nikolas090189@gmail.com",
      password: "1234",
    });

    const response = await api
      .post(`${Paths.AUTH}/login`)
      .send({
        email: "nikolas090189@gmail.com",
        password: "1234",
      })
      .expect("Content-Type", /application\/json/);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  });

  it("Cuando un usuario se loguea erroneamente recibimos un status 203 y un mensage de error.", async () => {
    await api.post(`${Paths.AUTH}/signup`).send({
      username: "nikodev",
      email: "nikolas090189@gmail.com",
      password: "1234",
    });

    const response = await api
      .post(`${Paths.AUTH}/login`)
      .send({
        email: "nikolas090189@gmail.com",
        password: "claveIncorrecta123",
      })
      .expect("Content-Type", /application\/json/);

    expect(response.status).toBe(203);
    expect(response.body.error).toBeTruthy();
  });

  it("Cuando el email del usuario no existe recibimos un status 203 y un mensage de error.", async () => {
    const response = await api
      .post(`${Paths.AUTH}/login`)
      .send({
        email: "esteEmailNoExiste@gmail.com",
        password: "claveIncorrecta123",
      })
      .expect("Content-Type", /application\/json/);

    expect(response.status).toBe(203);
    expect(response.body.error).toBeTruthy();
  });

  it("Si el esquema no pasa la validación de datos se recibirá status 422 y un error.", async () => {
    const response = await api
      .post(`${Paths.AUTH}/login`)
      .send({
        email: "esteEmailNoExiste",
        password: "claveIncorrecta123",
      })
      .expect("Content-Type", /application\/json/);

    expect(response.status).toBe(422);
    expect(response.body.error).toBeDefined();
  });
});

afterAll(async () => {
  await resetDatabase();
});
