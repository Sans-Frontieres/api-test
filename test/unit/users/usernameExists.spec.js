import { User } from "../../../src/model";
import { app, resetDatabase } from "../../setup";

beforeAll((done) => {
  app;
  done();
});

beforeEach(async () => {
  await resetDatabase();
});

describe("Existencia de username en el alta de un usuario. - (Unitario) -", () => {
  it("Existencia de un usuername en el sistema retorna true.", async () => {
    const newUser = {
      username: "nikodev",
      email: "nikolas090189@gmail.com",
      password: "1234",
    };

    await User.signUp(newUser);

    const exists = await User.usernameExists("nikodev");

    expect(exists).toBeTruthy();
  });

  it("El username se encuentra libre retorna false.", async () => {
    const exists = await User.usernameExists("nikodev");

    expect(exists).toBeFalsy();
  });
});

beforeAll(async () => {
  await resetDatabase();
});
