import Paths from "../../../src/routes/paths";
import { api, resetDatabase } from "../../setup";

beforeEach(async () => {
  await resetDatabase();
});

describe(`POST "${Paths.AUTH}" login de un usuario. - (Integration)`, () => {
  it("Cuando un usuario se loguea correctamente obtenemos success = true.", async () => {
    await api.post(`${Paths.AUTH}/singup`).send({
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
    expect(response.body.success).toBeTruthy();
  });

  it("Cuando un usuario se loguea erroneamente obtenemos success = false.", async () => {
    await api.post(`${Paths.AUTH}/singup`).send({
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
    expect(response.body.success).toBeFalsy();
  });

  it("Cuando el email del usuario no existe obtenemos success = false.", async () => {
    const response = await api
      .post(`${Paths.AUTH}/login`)
      .send({
        email: "esteEmailNoExiste@gmail.com",
        password: "claveIncorrecta123",
      })
      .expect("Content-Type", /application\/json/);

    expect(response.status).toBe(203);
    expect(response.body.success).toBeFalsy();
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
