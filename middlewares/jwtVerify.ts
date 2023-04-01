//jwt verify middleware
import { NextFunction, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken';
import { DecryptPayload } from '../helpers/token';
import User from '../database/models/User';

export const jwtVerify = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({
            message: 'No token, authorization denied'
        });
    }
    try {
        const decoded = DecryptPayload(token) as JwtPayload;
        const {id} = decoded.user;
        req.body.user = await User.findById(id);
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Invalid token'
        });
    }
    

}

//get errors middleware