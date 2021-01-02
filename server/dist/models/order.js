"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderScheme = new mongoose_1.default.Schema({
    products: [
        {
            productId: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    user: {
        userId: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            required: false,
            ref: 'User'
        },
        name: {
            type: String,
            required: true
        },
    },
    date: {
        type: Date,
        default: Date.now
    },
});
exports.default = mongoose_1.default.model('Order', OrderScheme);
