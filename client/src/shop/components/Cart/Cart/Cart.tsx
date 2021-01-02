import React, { useContext, useState } from 'react';
//import { Link } from 'react-router-dom';
//import { routesUrl } from '../../../../app/Routes';
import CartContext from '../../../../context/Cart/CartContext';
import CartItem from './CartItem';
import '../../../styles/layout/cart.scss';

const Cart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const cartContext = useContext(CartContext);
  const productInCart: any = cartContext.items;

  const onSubmitOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    cartContext.submitOrder();
  }

  return (
    <main
        className="content"
        role="main"
        itemScope={undefined}
        itemProp="mainContentOfPage"
    >
        <section className="content__intro">
          <div className="container">
            <h1>Cart</h1>

            {isLoading ? (
              <p>Loading ...</p>     
            ) : (
              cartContext.items.length === 0 ? (
                <p>Cart is empty</p>
              ) : (                
                <div>
                  <table className="cart-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productInCart.map((item: any) => (
                          <CartItem key={item._id} item={item} />
                        ))}
                    </tbody>
                  </table>                       
                  <button onClick={onSubmitOrder} type="button">Submit Order</button>
                </div>
              )                  
            )}
              
          </div>
        </section>              
    </main>
  );
}

export default Cart;
