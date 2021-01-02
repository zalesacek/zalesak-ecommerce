import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        if(users) {
            res.status(200).json({
                message: 'Users successfully fetched',
                data: users,
            })
        } else {
            res.status(500).json({
                message: 'Error in getting data about users',
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error in getting data about users',
            data: error,
        })
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        if(user) {
            res.status(200).json({
                message: 'User successfully fetched',
                data: user,
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

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, isAdmin } = req.body;
    const userUpdatedData = {
        name, email, isAdmin
    };
    try {
        let user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }
        if (name) {
            userUpdatedData.name = name;
        }
        if (email) {
            userUpdatedData.email = email;
        }
        userUpdatedData.isAdmin = isAdmin;
        user = await User.findByIdAndUpdate(
            req.params.userId,
            { $set: userUpdatedData },
            { new: true }
        );
        res.status(200).json({
            message: 'User data updated successfully',
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error in updating user data',
            data: error,
        })
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }
        await User.findOneAndRemove({_id: req.params.userId});
        res.status(200).json({
            message: 'User deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error in deleting user',
            data: error,
        })
    }
}