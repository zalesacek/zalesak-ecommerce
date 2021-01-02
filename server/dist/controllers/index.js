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
const product_1 = __importDefault(require("../models/product"));
const user_1 = __importDefault(require("../models/user"));
const order_1 = __importDefault(require("../models/order"));
exports.getProducts = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find();
        res.status(200).json({
            message: 'Products data fetched successfully',
            data: products,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error in getting data about products',
            data: error,
        });
    }
});
exports.createProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { title, imageUrl, price } = req.body;
    try {
        const product = new product_1.default({
            title: title,
            imageUrl: imageUrl,
            price: price,
        });
        yield product.save();
        res.status(200).json({
            message: 'Product data saved successfully',
            data: product,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error in saving data about product to db',
            data: error,
        });
    }
});
exports.getProductDetail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const productId = req.params.productId;
    try {
        const product = yield product_1.default.findById(productId);
        res.status(200).json({
            message: 'Product data fetched successfully',
            data: product,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error in getting data about product',
            data: error,
        });
    }
});
exports.updateProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { title, imageUrl, price } = req.body;
    const productUpdatedData = {
        title, imageUrl, price
    };
    try {
        let product = yield product_1.default.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "Product not Found" });
        }
        if (title) {
            productUpdatedData.title = title;
        }
        if (imageUrl) {
            productUpdatedData.imageUrl = imageUrl;
        }
        if (price !== null && price > 0) {
            productUpdatedData.price = price;
        }
        product = yield product_1.default.findByIdAndUpdate(req.params.productId, { $set: productUpdatedData }, { new: true });
        res.status(200).json({
            message: 'Product data updated successfully',
            data: product,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error in updating product',
            data: error,
        });
    }
});
exports.deleteProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let product = yield product_1.default.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "Product not Found" });
        }
        yield product_1.default.findOneAndRemove({ _id: req.params.productId });
        res.status(200).json({
            message: 'Product deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error in deleting product',
            data: error,
        });
    }
});
exports.postCart = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let product = yield product_1.default.findById(req.body.productId);
        if (!product) {
            return res.status(404).json({ message: "Product not Found" });
        }
        console.log("TODO: Save to user cart in");
        res.status(200).json({
            message: 'Product was successfully added to cart',
            data: {
                _id: product._id,
                title: product.title,
                imageUrl: product.imageUrl,
                price: product.price,
                quantity: 1,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error in adding product to cart',
            data: error,
        });
    }
});
exports.postOrder = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let user = {
            userId: null,
            name: '',
        };
        if (req.body.user._id) {
            const reqUser = yield user_1.default.findById(req.body.user._id);
            if (!reqUser) {
                return res.status(404).json({ message: "User not Found" });
            }
            user.userId = reqUser._id;
            user.name = reqUser.name;
        }
        else {
            user.name = req.body.user.name;
        }
        const products = req.body.items.map((i) => {
            return {
                productId: i._id,
                quantity: i.quantity,
                price: i.price,
            };
        });
        const order = new order_1.default({
            products: products,
            user: user,
        });
        yield order.save();
        res.status(200).json({
            message: 'Order was successfully submited',
            data: order,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error in submiting order',
            data: error,
        });
    }
});
exports.getAllOrders = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const orders = yield order_1.default.find();
        res.status(200).json({
            message: 'Orders were successfully fetched',
            data: orders,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error in getting orders',
            data: error,
        });
    }
});
exports.getOrders = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const orders = yield order_1.default.find({ 'user.userId': userId });
        res.status(200).json({
            message: 'Orders were successfully fetched',
            data: orders,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error in getting orders',
            data: error,
        });
    }
});
exports.getOrderDetail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const orderId = req.params.orderId;
    try {
        const order = yield order_1.default.findById(orderId);
        if (order) {
            const orderProducts = order.products.map((product) => __awaiter(this, void 0, void 0, function* () {
                const fetchedProduct = yield product_1.default.findById(product.productId);
                return fetchedProduct;
            }));
            res.status(200).json({
                message: 'Order data fetched successfully',
                data: {
                    _id: order._id,
                    //products: orderProducts,
                    products: order.products,
                    user: order.user,
                    date: order.date,
                }
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Error in getting data about order',
            data: error,
        });
    }
});
