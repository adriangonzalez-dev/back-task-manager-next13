"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskCreate = void 0;
const express_validator_1 = require("express-validator");
exports.taskCreate = [
    (0, express_validator_1.check)('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    (0, express_validator_1.check)('description')
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 3 }).withMessage('Description must be at least 3 characters long'),
    (0, express_validator_1.check)('priority')
        .notEmpty().withMessage('Priority is required')
        .isIn(['baja', 'media', 'alta']).withMessage('Priority must be one of these values: baja, media, alta')
];
