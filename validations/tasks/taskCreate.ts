import { check } from "express-validator";

export const taskCreate = [
    check('title')
    .notEmpty().withMessage('Title is required')
    .isLength({min: 3}).withMessage('Title must be at least 3 characters long'),
    check('description')
    .notEmpty().withMessage('Description is required')
    .isLength({min: 3}).withMessage('Description must be at least 3 characters long'),
    check('priority')
    .notEmpty().withMessage('Priority is required')
    .isIn(['baja', 'media', 'alta']).withMessage('Priority must be one of these values: baja, media, alta')
];