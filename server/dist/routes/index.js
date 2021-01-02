"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexController = __importStar(require("../controllers/index"));
const router = express_1.default.Router();
router.get('/products', indexController.getProducts);
router.post('/create-product', indexController.createProduct);
router.get('/products/:productId', indexController.getProductDetail);
router.put('/products/:productId', indexController.updateProduct);
router.delete('/products/:productId', indexController.deleteProduct);
router.post('/add-cart', indexController.postCart);
router.post('/create-order', indexController.postOrder);
router.get('/orders', indexController.getAllOrders);
router.get('/orders/:userId', indexController.getOrders);
router.get('/order-detail/:orderId', indexController.getOrderDetail);
exports.default = router;
