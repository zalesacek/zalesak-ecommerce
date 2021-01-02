import mongoose, { Document } from 'mongoose';

export interface IUser {
    isAdmin: boolean;
    name: string;
    email: string;
    password: string;
    date: Date;
}

const UserScheme = new mongoose.Schema({
    isAdmin: {
        type: Boolean,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    cart: {
        items: [
          {
            productId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Product',
              required: true
            },
            quantity: { 
                type: Number, 
                required: true 
            }
          }
        ]
      }
});

export default mongoose.model<IUser & Document>('User', UserScheme);