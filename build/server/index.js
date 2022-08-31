"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config");
const app_1 = __importDefault(require("./app"));
const db_1 = require("./db");
(0, db_1.createConnection)();
const listenServer = () => {
    app_1.default.listen(process.env.PORT, () => {
        console.log(`Server is running at
        PORT: ${process.env.PORT}
          DB: ${process.env.DB_LOCAL_PATH}`);
    });
};
if (process.env.NODE_ENV != "test")
    listenServer();
exports.default = app_1.default;
