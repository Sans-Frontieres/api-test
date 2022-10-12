import { User, resetDatabase, userNiko } from "../../setup";

let user;

beforeAll(async () => {
  await resetDatabase();
  await User.create(userNiko);
});

describe("Login - Sesion de usuario. - (Unitario) -", () => {
  it("El usuario inicia sesion correctamente obtenemos un token.", async () => {
    const response = await User.login({
      email: user.email,
      password: user.password,
    });

    expect(response.token).toBeDefined();
  });

  it("El usuario inicia sesion con un password incorrecto obtenemos undefined.", async () => {
    const response = await User.login({
      email: user.email,
      password: "contraseña_incorrecta",
    });

    expect(response).toBeUndefined();
  });

  it("El usuario no existe obtenemos undefined.", async () => {
    const response = await User.login({
      email: "email-inexistente",
      password: "contraseña_incorrecta",
    });

    expect(response).toBeUndefined();
  });
});

afterAll(async () => await resetDatabase());
