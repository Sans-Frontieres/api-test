import { app, User, resetDatabase } from "../../setup";

beforeAll((done) => {
  app;
  done();
});

beforeEach(async () => {
  await resetDatabase();
});

describe("Existencia de email en el alta de un usuario. - (Unitario) -", () => {
  it("Existencia de un email en el sistema retorna true.", async () => {
    const newUser = {
      username: "nikodev",
      email: "nikolas090189@gmail.com",
      password: "1234",
    };

    await User.signUp(newUser);

    const exists = await User.emailExists("nikolas090189@gmail.com");

    expect(exists).toBeTruthy();
  });

  it("El email se encuentra libre retorna false.", async () => {
    const exists = await User.emailExists("nikolas090189@gmail.com");

    expect(exists).toBeFalsy();
  });
});

beforeAll(async () => {
  await resetDatabase();
});
