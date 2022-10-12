import { User, resetDatabase, userNiko } from "../../setup";

beforeEach(async () => await resetDatabase());

describe("Existencia de email en el alta de un usuario. - (Unitario) -", () => {
  it("Existencia de un email en el sistema retorna true.", async () => {
    await User.create(userNiko);

    const exists = await User.emailExists("nikolas090189@gmail.com");

    expect(exists).toBeTruthy();
  });

  it("El email se encuentra libre retorna false.", async () => {
    const exists = await User.emailExists("nikolas090189@gmail.com");

    expect(exists).toBeFalsy();
  });
});

afterAll(async () => await resetDatabase());
