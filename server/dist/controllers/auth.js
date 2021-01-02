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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
let jwtSecret;
if (process.env.NODE_ENV === 'production') {
    jwtSecret = process.env.JWT_SECRET;
}
else {
    jwtSecret = 'supersecret';
}
exports.loadUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        const tokenContent = jsonwebtoken_1.default.verify(token, jwtSecret);
        const user = yield user_1.default.findById(tokenContent._id);
        if (user) {
            res.status(200).json({
                message: 'User successfully fetched',
                data: user,
                token: token,
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
exports.postLogin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }
        else {
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Wrong password" });
            }
            else {
                const tokenContent = {
                    _id: user._id,
                };
                const expiresIn = 60 * 60;
                const token = {
                    token: jsonwebtoken_1.default.sign(tokenContent, jwtSecret, { expiresIn }),
                    expiresIn
                };
                res.status(200).json({
                    message: 'User successfully logged',
                    data: user,
                    token: token,
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Error in getting data about user',
            data: error,
        });
    }
});
exports.postSignup = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User with that email already exist" });
        }
        else {
            const hashedPass = yield bcryptjs_1.default.hash(password, 12);
            const newUser = new user_1.default({
                isAdmin: false,
                name: name,
                email: email,
                password: hashedPass,
            });
            yield newUser.save();
            const savedUser = yield user_1.default.findOne({ email: newUser.email });
            if (savedUser) {
                const tokenContent = {
                    _id: savedUser._id,
                };
                const expiresIn = 60 * 60;
                const token = {
                    token: jsonwebtoken_1.default.sign(tokenContent, jwtSecret, { expiresIn }),
                    expiresIn
                };
                res.status(200).json({
                    message: 'User successfully created',
                    data: newUser,
                    token: token,
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Error in registration user',
            data: error,
        });
    }
});
