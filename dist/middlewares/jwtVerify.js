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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerify = void 0;
const token_1 = require("../helpers/token");
const User_1 = __importDefault(require("../database/models/User"));
const jwtVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({
            message: 'No token, authorization denied'
        });
    }
    try {
        const decoded = (0, token_1.DecryptPayload)(token);
        const { id } = decoded.user;
        req.body.user = yield User_1.default.findById(id);
        next();
    }
    catch (error) {
        res.status(401).json({
            message: 'Invalid token'
        });
    }
});
exports.jwtVerify = jwtVerify;
//get errors middleware
