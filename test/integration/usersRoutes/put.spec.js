import { api, Paths, User, Roles, resetDatabase, userNiko } from "../../setup";

let user;

beforeEach(async () => {
  await resetDatabase();

  const {
    body: { id },
  } = await api.post(`${Paths.AUTH}/signup`).send(userNiko);

  const result = await api.get(`${Paths.USERS}/${id}`);

  user = result.body;
});

describe(`PUT "${Paths.USERS}" actualización de roles de usuarios. - (Integration)`, () => {
  it("Se agrega el rol de admin a un user.", async () => {
    expect(User.hasRole(user, Roles.ADMIN)).toBeFalsy();

    await api
      .put(`${Paths.USERS}/addRole`)
      .send({ userId: user.id, role: Roles.ADMIN });

    const response = await api.get(`${Paths.USERS}/${user.id}`);
    const userUpdate = response.body;

    expect(User.hasRole(userUpdate, Roles.ADMIN)).toBeTruthy();
  });

  it("Se quita el rol de admin a un user admin.", async () => {
    await api
      .put(`${Paths.USERS}/addRole`)
      .send({ userId: user.id, role: Roles.ADMIN });
    const result = await api.get(`${Paths.USERS}/${user.id}`);

    expect(User.hasRole(result.body, Roles.ADMIN)).toBeTruthy();

    await api
      .put(`${Paths.USERS}/popRole`)
      .send({ userId: user.id, role: Roles.ADMIN });

    const response = await api.get(`${Paths.USERS}/${user.id}`);
    const userUpdate = response.body;

    expect(User.hasRole(userUpdate, Roles.ADMIN)).toBeFalsy();
  });
});

afterAll(async () => {
  await resetDatabase();
});
