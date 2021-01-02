import mongoose, { Document } from 'mongoose';
import { IProduct } from './product';

export interface IOrder {
    products: IOrderItem[];
    user: {
        userId?: string;
        name: string;
    }
    date: Date;
}

export interface IOrderItem {
    product: IProduct;
    quantity: number;
}

const OrderScheme = new mongoose.Schema({
    products: [
        {
          productId: { type: String, required: true },
          quantity: { type: Number, required: true },
          price: { type: Number, required: true }
        }
      ],
      user: {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.model<IOrder & Document>('Order', OrderScheme);