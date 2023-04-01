import {check} from 'express-validator';

export const userLogin = [
    check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email is not valid'),
    check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
]