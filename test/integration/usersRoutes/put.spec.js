import {
  api,
  Paths,
  User,
  Roles,
  resetDatabase,
  userNiko,
  jwtAdmin,
  insertModerator,
} from "../../setup";

let token;

beforeEach(async () => {
  await resetDatabase();
  token = await jwtAdmin();
});

describe.skip(`PUT "${Paths.USERS}" actualización de roles de usuarios. - (Integration)`, () => {
  it("Se agrega el rol de admin a un user.", async () => {
    const response = await api.post(`${Paths.AUTH}/singup`).send(userNiko);

    expect(await User.hasRole(response.body.id, Roles.ADMIN)).toBeFalsy();

    await api
      .put(`${Paths.USERS}/addRole`)
      .send({ userId: response.body.id, role: Roles.ADMIN })
      .set("authorization", token);

    const result = await api
      .get(`${Paths.USERS}/${response.body.id}`)
      .set("authorization", token);

    expect(await User.hasRole(result.body.id, Roles.ADMIN)).toBeTruthy();
  });

  it("Se quita el rol a un user moderador.", async () => {
    const moderator = await insertModerator();

    expect(await User.hasRole(moderator.id, Roles.MODERATOR)).toBeTruthy();

    await api
      .put(`${Paths.USERS}/popRole`)
      .send({ userId: moderator.id, role: Roles.ADMIN })
      .set("authorization", token);

    const response = await api
      .get(`${Paths.USERS}/${moderator.id}`)
      .set("authorization", token);
    const id = response.body.id;

    expect(await User.hasRole(id, Roles.ADMIN)).toBeFalsy();
  });
});

afterAll(async () => await resetDatabase());
