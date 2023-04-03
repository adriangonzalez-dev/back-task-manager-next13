"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrors = void 0;
const express_validator_1 = require("express-validator");
const getErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }
    next();
};
exports.getErrors = getErrors;
