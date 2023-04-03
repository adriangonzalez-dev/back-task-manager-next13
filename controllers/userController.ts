import { Request, Response } from "express";
import User from "../database/models/User";
import { ComparePassword, EncryptPassword } from "../helpers/bcrypt";
import { EncryptPayload } from "../helpers/token";
import { sendEmail } from "../helpers/nodemailer";
import { randomAvatar } from "../helpers/randomAvatar";

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

            req.body.avatar = `https://api.dicebear.com/6.x/adventurer/svg?seed=${randomAvatar()}`

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
                    lastName: user.lastName,
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
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        })
    },
    recovery: async (req: Request, res: Response) => {
        const {email} = req.body;

        try {
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({
                    message: 'Email not found'
                });
            }
            const token = EncryptPayload({user: {id: user._id}});

            const options = {
                to: email,
                subject: 'Recovery password',
                text: `Has click en el siguiente link para recuperar tu contraseña: ${process.env.LINK_RECOVERY}?token=${token}`,
            };

            const response = sendEmail(options);

            res.status(200).json({
                message: 'Email sent',
                response
            })
        } catch (error) {
            console.log(error);
        }
        
    },
    resetPassword: async (req: Request, res: Response) => {
        const {password} = req.body;
        const {user} = req.body;

        try {
            const userFound = await User.findById(user._id);
            if(!userFound){
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            userFound.password = EncryptPassword(password);
            await userFound.save();

            res.status(200).json({
                message: 'Password updated successfully'
            })
        } catch (error) {
            console.log(error);
        }
    },
    googleSignIn: async (req: Request, res: Response) => {
        const userGoogle = {
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            avatar: req.body.avatar,
            password: '123456',
            google: true
        }

        try {
            const user = await User.findOne({email: userGoogle.email, google: true});
            if(!user){
                const newUser = new User(userGoogle);
                await newUser.save();

                const payload = {
                    user: {
                        id: newUser._id,
                    }
                }
                const token:string = EncryptPayload(payload)
                return res.status(200).json({
                    user:{
                        name: newUser.name,
                        lastName: newUser.lastName,
                        email: newUser.email,
                        role: newUser.role,
                        avatar: newUser.avatar
                    },
                    token
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
                        lastName: user.lastName,
                        email: user.email,
                        role: user.role,
                        avatar: user.avatar
                    },
                    token
                });
            
        } catch (error) {
            console.log(error);
        }

    }


};