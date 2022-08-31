"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const tasks_routes_1 = __importDefault(require("../routes/tasks.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
//para solicitud de obj entrantes
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)("dev"));
app.use("/api/v1/tasks", tasks_routes_1.default);
app.use("/api/v1", (req, res, next) => {
    res.status(200).json({ message: "Respuesta al navegador" });
});
exports.default = app;
