import jwt from 'jsonwebtoken';

export const EncryptPayload = (payload: {}) => {
    return jwt.sign(payload, String(process.env.JWT_SECRET), { expiresIn: 3600 });
}

export const DecryptPayload = (token: string) => {
    return jwt.verify(token, String(process.env.JWT_SECRET));
}