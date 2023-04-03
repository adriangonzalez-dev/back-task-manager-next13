"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecryptPayload = exports.EncryptPayload = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const EncryptPayload = (payload) => {
    return jsonwebtoken_1.default.sign(payload, String(process.env.JWT_SECRET), { expiresIn: 3600 });
};
exports.EncryptPayload = EncryptPayload;
const DecryptPayload = (token) => {
    return jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET));
};
exports.DecryptPayload = DecryptPayload;
