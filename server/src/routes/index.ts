import express from 'express';
import * as indexController from '../controllers/index';

const router = express.Router();

router.get('/products', indexController.getProducts)

router.post('/create-product', indexController.createProduct);

router.get('/products/:productId', indexController.getProductDetail);

router.put('/products/:productId', indexController.updateProduct);

router.delete('/products/:productId', indexController.deleteProduct);

router.post('/add-cart', indexController.postCart);

router.post('/create-order', indexController.postOrder);

router.get('/orders', indexController.getAllOrders);

router.get('/orders/:userId', indexController.getOrders);

router.get('/order-detail/:orderId', indexController.getOrderDetail);

export default router;