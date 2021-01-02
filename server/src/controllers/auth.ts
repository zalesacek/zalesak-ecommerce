import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

interface IToken {  
    token: string;  
    expiresIn: number;
}

interface ITokenContent {  
    _id: string;
}

let jwtSecret: string;
if(process.env.NODE_ENV === 'production'){
  jwtSecret = process.env.JWT_SECRET as string;
} else {
  jwtSecret = 'supersecret';
}

export const loadUser = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;
    try {
        const tokenContent = jwt.verify(token, jwtSecret) as ITokenContent;
        const user = await User.findById(tokenContent._id);
        if(user) {
            res.status(200).json({
                message: 'User successfully fetched',
                data: user,
                token: token,
            })
        } else {
            res.status(500).json({
                message: 'Error in getting data about user',
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error in getting data about user',
            data: error,
        })
    }
}

export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        } else {
            const isMatch = await bcrypt.compare(password, user.password);            
            if (!isMatch) {
                return res.status(400).json({ message: "Wrong password" });
            } else {

                const tokenContent: ITokenContent = {
                    _id: user._id,
                }
                const expiresIn = 60 * 60;
                const token: IToken = {
                    token: jwt.sign(tokenContent, jwtSecret, {expiresIn}),
                    expiresIn
                }

                res.status(200).json({
                    message: 'User successfully logged',
                    data: user,
                    token: token,
                })
            }
        }        
    } catch (error) {
        res.status(500).json({
            message: 'Error in getting data about user',
            data: error,
        })
    }
}

export const postSignup = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User with that email already exist" });
        } else {
            const hashedPass = await bcrypt.hash(password, 12);
            const newUser = new User({
                isAdmin: false,
                name: name,
                email: email,
                password: hashedPass,
            });
            await newUser.save();
            const savedUser = await User.findOne({ email: newUser.email });
            if(savedUser){
                const tokenContent: ITokenContent = {
                    _id: savedUser._id,
                }
                const expiresIn = 60 * 60;
                const token: IToken = {
                    token: jwt.sign(tokenContent, jwtSecret, {expiresIn}),
                    expiresIn
                }
                res.status(200).json({
                    message: 'User successfully created',
                    data: newUser,
                    token: token,
                })
            }            
        }        
    } catch (error) {
        res.status(500).json({
            message: 'Error in registration user',
            data: error,
        })
    }
}