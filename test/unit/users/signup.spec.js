import { User } from "../../../src/model";
import { app, resetDatabase } from "../../setup";

beforeAll((done) => {
  app;
  done();
});

beforeEach(async () => {
  await resetDatabase();
});

describe.skip("Alta de usuario. - (Unitario) -", () => {
  it("Creación de un nuevo usuario devuelve el id.", async () => {
    const newUser = {
      username: "nikodev",
      email: "nikolas090189@gmail.com",
      password: "miPassword1234",
    };

    const { id } = await User.signUp(newUser);

    expect(id).toBeDefined();
  });
});

afterAll(async () => {
  await resetDatabase();
});
