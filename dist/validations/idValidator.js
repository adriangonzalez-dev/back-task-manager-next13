"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idValidator = void 0;
const express_validator_1 = require("express-validator");
exports.idValidator = [
    (0, express_validator_1.check)('id')
        .isMongoId()
        .withMessage('Id must be a valid MongoId')
];
