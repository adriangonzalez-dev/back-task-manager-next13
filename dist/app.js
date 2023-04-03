"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./database/config"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const jwtVerify_1 = require("./middlewares/jwtVerify");
const port = Number(process.env.PORT);
const app = (0, express_1.default)();
(0, config_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN_PROD,
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/tasks', jwtVerify_1.jwtVerify, routes_1.taskRouter);
app.use('/api/auth', routes_1.userRouter);
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
