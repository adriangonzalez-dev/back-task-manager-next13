import { check } from 'express-validator';

export const idValidator = [
    check('id')
        .isMongoId()
        .withMessage('Id must be a valid MongoId')
];