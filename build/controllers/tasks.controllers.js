"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.remove = exports.update = exports.create = exports.findByID = exports.count = exports.getAll = void 0;
const Task = __importStar(require("../model/Task"));
const getAll = (__, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tasks, count } = yield Task.all();
    res.json({ tasks, count });
});
exports.getAll = getAll;
const count = (__, res) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield Task.count();
    res.json({ count });
});
exports.count = count;
const findByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const task = yield Task.findByID(id);
    if (!task)
        return res.status(404).json({ message: "Tarea no encontrada." });
    res.status(200).json(task);
});
exports.findByID = findByID;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const id = yield Task.create(title, description);
    res.status(201).json(id);
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, description } = req.body;
    const idTask = yield Task.update(id, title, description);
    if (!idTask)
        return res.status(404).json({ message: "La tarea no fue encontrada." });
    res.status(200).json({ id: idTask });
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const idTask = yield Task.remove(id);
    if (!idTask)
        return res.status(404).json({ message: "La tarea no fue encontrada." });
    res.status(202).json(idTask);
});
exports.remove = remove;
