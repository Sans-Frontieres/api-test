"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.findByID = exports.count = exports.all = void 0;
const uuid_1 = require("uuid");
const db_1 = require("../server/db");
const all = () => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield (0, db_1.getConnection)().get("tasks").value();
    return { tasks, count: tasks.length };
});
exports.all = all;
const count = () => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield (0, db_1.getConnection)().get("tasks").value();
    return tasks.length;
});
exports.count = count;
const findByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield (0, db_1.getConnection)().get("tasks").find({ id }).value();
    return task;
});
exports.findByID = findByID;
const create = (title, description) => __awaiter(void 0, void 0, void 0, function* () {
    const newTask = {
        id: (0, uuid_1.v4)(),
        title,
        description,
    };
    const db = yield (0, db_1.getConnection)();
    yield db.get("tasks").push(newTask).write();
    return newTask.id;
});
exports.create = create;
const update = (id, title, description) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.getConnection)();
    const task = yield db.get("tasks").find({ id }).value();
    if (!task)
        return;
    yield db.get("tasks").find({ id }).assign({ title, description }).write();
    return id;
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.getConnection)();
    const task = yield db.get("tasks").find({ id }).value();
    if (!task)
        return;
    yield db.get("tasks").remove({ id }).write();
    return id;
});
exports.remove = remove;
