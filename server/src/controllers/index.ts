import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import User from '../models/user';
import Order from '../models/order';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            message: 'Products data fetched successfully',
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error in getting data about products',
            data: error,
        })
    }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { title, imageUrl, price } = req.body;
    try {
        const product = new Product({
            title: title,
            imageUrl: imageUrl,
            price: price,
        });
        await product.save();
        res.status(200).json({
            message: 'Product data saved successfully',
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error in saving data about product to db',
            data: error,
        })
    }
}

export const getProductDetail = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        res.status(200).json({
            message: 'Product data fetched successfully',
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error in getting data about product',
            data: error,
        })
    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { title, imageUrl, price } = req.body;
    const productUpdatedData = {
        title, imageUrl, price
    };
    try {
        let product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "Product not Found" });
        }
        if (title) {
            productUpdatedData.title = title;
        }
        if (imageUrl) {
            productUpdatedData.imageUrl = imageUrl;
        }
        if(price !== null && price > 0){
            productUpdatedData.price = price;
        }
        product = await Product.findByIdAndUpdate(
            req.params.productId,
            { $set: productUpdatedData },
            { new: true }
        );
        res.status(200).json({
            message: 'Product data updated successfully',
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error in updating product',
            data: error,
        })
    }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "Product not Found" });
        }
        await Product.findOneAndRemove({_id: req.params.productId});
        res.status(200).json({
            message: 'Product deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error in deleting product',
            data: error,
        })
    }
}

export const postCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let product = await Product.findById(req.body.productId);
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
    } catch (error) {
        res.status(500).json({
            message: 'Error in adding product to cart',
            data: error,
        })
    }
}

export const postOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user = {
            userId: null,
            name: '',
        };
        if(req.body.user._id) {
            const reqUser = await User.findById(req.body.user._id);
            if(!reqUser){
                return res.status(404).json({ message: "User not Found" });
            }
            user.userId = reqUser._id;
            user.name = reqUser.name;
        } else {
            user.name = req.body.user.name;
        }

        const products = req.body.items.map((i:any) => {
            return {
                productId: i._id,
                quantity: i.quantity,
                price: i.price,                
            }
        })

        const order = new Order({
            products: products,
            user: user,
        })

        await order.save()

        res.status(200).json({            
            message: 'Order was successfully submited',
            data: order,            
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error in submiting order',
            data: error,
        })
    }
}

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await Order.find();
        res.status(200).json({            
            message: 'Orders were successfully fetched',
            data: orders,            
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error in getting orders',
            data: error,
        })
    }
}

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    try {
        const orders = await Order.find({ 'user.userId': userId });
        res.status(200).json({            
            message: 'Orders were successfully fetched',
            data: orders,            
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error in getting orders',
            data: error,
        })
    }
}

export const getOrderDetail = async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.orderId;
    try {
        const order = await Order.findById(orderId);
        if(order){
            const orderProducts = order.products.map(async (product: any) => {    
                const fetchedProduct = await Product.findById(product.productId)
                return fetchedProduct
            })
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
    } catch (error) {
        res.status(500).json({
            message: 'Error in getting data about order',
            data: error,
        })
    }
}