"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparePassword = exports.EncryptPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const EncryptPassword = (password) => {
    return bcryptjs_1.default.hashSync(password, Number(process.env.BCRYPT_SALT_ROUNDS));
};
exports.EncryptPassword = EncryptPassword;
const ComparePassword = (password, hash) => {
    return bcryptjs_1.default.compareSync(password, hash);
};
exports.ComparePassword = ComparePassword;
