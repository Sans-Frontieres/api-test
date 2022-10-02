import { app, User, resetDatabase } from "../../setup";

let usuario_1;

beforeAll(async () => {
  app;
  await resetDatabase();
  usuario_1 = {
    username: "nikodev",
    email: "nikolas090189@gmail.com",
    password: "1234",
  };
  await User.signUp(usuario_1);
});

describe("Login - Sesion de usuario. - (Unitario) -", () => {
  it("El usuario inicia sesion correctamente obtenemos un token.", async () => {
    const result = await User.login({
      email: usuario_1.email,
      password: usuario_1.password,
    });

    expect(result.token).toBeDefined();
  });

  it("El usuario inicia sesion con un password incorrecto obtenemos undefined.", async () => {
    const result = await User.login({
      email: usuario_1.email,
      password: "contraseña_incorrecta",
    });

    expect(result).toBeUndefined();
  });

  it("El usuario no existe obtenemos undefined.", async () => {
    const result = await User.login({
      email: "email-inexistente",
      password: "contraseña_incorrecta",
    });

    expect(result).toBeUndefined();
  });
});

afterAll(async () => {
  await resetDatabase();
});
