import supertest from "supertest";
import app from "../../src/server/app";
import { resetDatabase } from "../../src/server/database";
import { User } from "../../src/models";
import { Paths } from "../../src/routes";
import Roles from "../../src/enum";
import seed from "../../src/seed";

const api = supertest(app);

const insertAdmin = async () => {
  const adminUser = await User.create({
    username: "Admin",
    email: "admin@mail.com",
    password: "admin123",
  });
  await User.addRole(adminUser.id, Roles.ADMIN);
  return adminUser;
};

const insertModerator = async () => {
  const moderatorUser = await User.create({
    username: "Moderator",
    email: "moderator@mail.com",
    password: "moderator123",
  });
  await User.addRole(moderatorUser.id, Roles.MODERATOR);

  return moderatorUser;
};

const jwtAdmin = async () => {
  await insertAdmin();

  const res = await api
    .post(`${Paths.AUTH}/login`)
    .send({ email: "admin@mail.com", password: "admin123" });
  return res.body;
};

const jwtModerator = async () => {
  await insertModerator();

  const res = await api
    .post(`${Paths.AUTH}/login`)
    .send({ email: "moderator@mail.com", password: "moderator123" });
  return res.body;
};

const task = {
  title: "Primera tarea creada.",
  description: "Debo crear una tarea para el testing con Jest.",
};

const userNiko = {
  username: "nikodev",
  email: "nikolas090189@gmail.com",
  password: "miContraseña1234",
};

export {
  api,
  seed,
  insertAdmin,
  insertModerator,
  jwtAdmin,
  jwtModerator,
  resetDatabase,
  task,
  userNiko,
  User,
};
