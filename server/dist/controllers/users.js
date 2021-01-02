"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
exports.getUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        if (users) {
            res.status(200).json({
                message: 'Users successfully fetched',
                data: users,
            });
        }
        else {
            res.status(500).json({
                message: 'Error in getting data about users',
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Error in getting data about users',
            data: error,
        });
    }
});
exports.getUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = yield user_1.default.findById(userId);
        if (user) {
            res.status(200).json({
                message: 'User successfully fetched',
                data: user,
            });
        }
        else {
            res.status(500).json({
                message: 'Error in getting data about user',
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Error in getting data about user',
            data: error,
        });
    }
});
exports.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { name, email, isAdmin } = req.body;
    const userUpdatedData = {
        name, email, isAdmin
    };
    try {
        let user = yield user_1.default.findById(req.params.userId);
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
        user = yield user_1.default.findByIdAndUpdate(req.params.userId, { $set: userUpdatedData }, { new: true });
        res.status(200).json({
            message: 'User data updated successfully',
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error in updating user data',
            data: error,
        });
    }
});
exports.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let user = yield user_1.default.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }
        yield user_1.default.findOneAndRemove({ _id: req.params.userId });
        res.status(200).json({
            message: 'User deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error in deleting user',
            data: error,
        });
    }
});
