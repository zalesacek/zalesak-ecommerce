import { createContext } from 'react';
import { ICart } from '../../app/Types';

const CartContext = createContext<ICart>({} as ICart);

export default CartContext;