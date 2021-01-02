import mongoose, { Document } from 'mongoose';

export interface IProduct {
    title: string;
    imageUrl: string;
    price: number;
}

const ProductScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

export default mongoose.model<IProduct & Document>('Product', ProductScheme);