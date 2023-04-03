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
exports.userController = void 0;
const User_1 = __importDefault(require("../database/models/User"));
const bcrypt_1 = require("../helpers/bcrypt");
const token_1 = require("../helpers/token");
const nodemailer_1 = require("../helpers/nodemailer");
const randomAvatar_1 = require("../helpers/randomAvatar");
exports.userController = {
    // POST / create user
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let user = yield User_1.default.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({
                    message: 'Email already exists'
                });
            }
            req.body.password = (0, bcrypt_1.EncryptPassword)(req.body.password);
            req.body.avatar = `https://api.dicebear.com/6.x/adventurer/svg?seed=${(0, randomAvatar_1.randomAvatar)()}`;
            user = new User_1.default(req.body);
            yield user.save();
            res.status(200).json({
                message: 'User created successfully',
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //login with email and password and return jwt token
        try {
            const user = yield User_1.default.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({
                    message: 'Invalid credentials'
                });
            }
            //compare password with bcrypt
            const isMatch = (0, bcrypt_1.ComparePassword)(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: 'Invalid credentials'
                });
            }
            const payload = {
                user: {
                    id: user._id,
                }
            };
            const token = (0, token_1.EncryptPayload)(payload);
            res.status(200).json({
                user: {
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar
                },
                token
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user } = req.body;
        res.status(200).json({
            user: {
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        });
    }),
    recovery: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.body;
        try {
            const user = yield User_1.default.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    message: 'Email not found'
                });
            }
            const token = (0, token_1.EncryptPayload)({ user: { id: user._id } });
            const options = {
                to: email,
                subject: 'Recovery password',
                text: `Has click en el siguiente link para recuperar tu contraseña: ${process.env.LINK_RECOVERY}?token=${token}`,
            };
            const response = (0, nodemailer_1.sendEmail)(options);
            res.status(200).json({
                message: 'Email sent',
                response
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    resetPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { password } = req.body;
        const { user } = req.body;
        try {
            const userFound = yield User_1.default.findById(user._id);
            if (!userFound) {
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            userFound.password = (0, bcrypt_1.EncryptPassword)(password);
            yield userFound.save();
            res.status(200).json({
                message: 'Password updated successfully'
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    googleSignIn: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userGoogle = {
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            avatar: req.body.avatar,
            password: '123456',
            google: true
        };
        try {
            const user = yield User_1.default.findOne({ email: userGoogle.email, google: true });
            if (!user) {
                const newUser = new User_1.default(userGoogle);
                yield newUser.save();
                const payload = {
                    user: {
                        id: newUser._id,
                    }
                };
                const token = (0, token_1.EncryptPayload)(payload);
                return res.status(200).json({
                    user: {
                        name: newUser.name,
                        lastName: newUser.lastName,
                        email: newUser.email,
                        role: newUser.role,
                        avatar: newUser.avatar
                    },
                    token
                });
            }
            const payload = {
                user: {
                    id: user._id,
                }
            };
            const token = (0, token_1.EncryptPayload)(payload);
            res.status(200).json({
                user: {
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar
                },
                token
            });
        }
        catch (error) {
            console.log(error);
        }
    })
};
