import { User, resetDatabase, userNiko } from "../../setup";

beforeAll(async () => await resetDatabase());

describe("Alta de usuario. - (Unitario) -", () => {
  it("Creación de un nuevo usuario devuelve el id.", async () => {
    const userId = await User.create(userNiko);

    expect(userId).toBeDefined();
  });
});

afterAll(async () => await resetDatabase());
