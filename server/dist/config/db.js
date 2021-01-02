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
const mongoose_1 = __importDefault(require("mongoose"));
let mongoURI;
if (process.env.NODE_ENV === 'production') {
    mongoURI = process.env.MONGO_URI;
}
else {
    mongoURI = 'mongodb+srv://petr123:petr123@cluster0.aw8kw.mongodb.net/shop?retryWrites=true&w=majority';
}
const db = mongoURI;
const connectDb = () => __awaiter(this, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("MongoDB Connected");
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
});
exports.default = connectDb;
