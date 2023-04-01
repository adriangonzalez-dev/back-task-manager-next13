import {check} from 'express-validator';

export const userCreate = [
    check('name')
    .notEmpty().withMessage('Name is required')
    .isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    check('lastName')
    .notEmpty().withMessage('Last name is required')
    .isLength({min: 3}).withMessage('Last name must be at least 3 characters long'),
    check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email is not valid'),
    check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
]