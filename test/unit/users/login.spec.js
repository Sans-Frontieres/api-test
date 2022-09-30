import { User } from "../../../src/model";
import { app, resetDatabase } from "../../setup";

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

describe.skip("Login - Sesion de usuario. - (Unitario) -", () => {
  it("El usuario inicia sesion correctamente obtenemos sucess = true.", async () => {
    const response = await User.login({
      email: usuario_1.email,
      password: usuario_1.password,
    });

    expect(response.token).toBeTruthy();
  });

  it("El usuario inicia sesion con un password incorrecto obtenemos sucess = false.", async () => {
    const response = await User.login({
      email: usuario_1.email,
      password: "contraseña_incorrecta",
    });

    expect(response?.token).toBeFalsy();
  });

  it("El usuario no existe obtenemos sucess = false.", async () => {
    const response = await User.login({
      email: "email-inexistente",
      password: "contraseña_incorrecta",
    });

    expect(response?.token).toBeFalsy();
  });
});

afterAll(async () => {
  await resetDatabase();
});
