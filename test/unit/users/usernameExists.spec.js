import { User, resetDatabase, userNiko } from "../../setup";

beforeEach(async () => await resetDatabase());

describe("Existencia de username en el alta de un usuario. - (Unitario) -", () => {
  it("Existencia de un usuername en el sistema retorna true.", async () => {
    await User.create(userNiko);

    const exists = await User.usernameExists("nikodev");

    expect(exists).toBeTruthy();
  });

  it("El username se encuentra libre retorna false.", async () => {
    const exists = await User.usernameExists("nikodev");

    expect(exists).toBeFalsy();
  });
});

afterAll(async () => await resetDatabase());
