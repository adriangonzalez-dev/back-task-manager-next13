"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = exports.taskRouter = void 0;
const taskRouter_1 = __importDefault(require("./taskRouter"));
exports.taskRouter = taskRouter_1.default;
const userRouter_1 = __importDefault(require("./userRouter"));
exports.userRouter = userRouter_1.default;
