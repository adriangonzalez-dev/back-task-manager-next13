"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCreate = void 0;
const express_validator_1 = require("express-validator");
exports.userCreate = [
    (0, express_validator_1.check)('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    (0, express_validator_1.check)('lastName')
        .notEmpty().withMessage('Last name is required')
        .isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    (0, express_validator_1.check)('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is not valid'),
    (0, express_validator_1.check)('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];
