import { Request, Response } from "express";
import User from "../database/models/User";
import { ComparePassword, EncryptPassword } from "../helpers/bcrypt";
import { EncryptPayload } from "../helpers/token";

export const userController = {
    // POST / create user
    create: async (req: Request, res: Response) => {
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({
                    message:'Email already exists'
                });
            }
            req.body.password = EncryptPassword(req.body.password);
            EncryptPassword

            user = new User(req.body);
            await user.save();

            res.status(200).json({
                message: 'User created successfully',
            });
        } catch (error) {
            console.log(error);
        }
    },
    login: async (req: Request, res: Response) => {
        //login with email and password and return jwt token
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({
                    message: 'Invalid credentials'
                });
            }

            //compare password with bcrypt
            const isMatch = ComparePassword(req.body.password, user.password)
            if (!isMatch) {
                return res.status(400).json({
                    message: 'Invalid credentials'
                });
            }
            const payload = {
                user: {
                    id: user._id,
                }
            }
            
            const token:string = EncryptPayload(payload)
            res.status(200).json({
                user:{
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar
                },
                token
            });
            

        } catch (error) {
            console.log(error);
        }

    },
    getUser: async (req: Request, res: Response) => {
        const {user} = req.body;

        res.status(200).json({
            user:{
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        })
    }

};