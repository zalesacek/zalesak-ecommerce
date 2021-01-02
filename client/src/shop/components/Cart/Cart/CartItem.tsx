import React from 'react';
import { Link } from 'react-router-dom';
import { routesUrl } from '../../../../app/Routes';
import { CartProduct } from '../../../../app/Types';
import '../../../styles/components/product-card.scss';

const CartItem = (props: {item: CartProduct}) => {
  return (
    <tr>
        <td>
            <Link to={routesUrl.ProductDetail + props.item._id} className="cart-table__product">
                <div>
                    <img src={props.item.imageUrl} alt={props.item.title} />
                </div>
                <div>
                    <h2>{props.item.title}</h2>              
                </div>
            </Link>
        </td>
        <td>
            <p>{props.item.quantity.toString()}x</p>
        </td>
        <td>
            <p>{props.item.price.toString()} Kč</p>
        </td>
        <td>
            <button type="button">Remove</button>
        </td>
    </tr>
  );
}

export default CartItem;
