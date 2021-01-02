import React from 'react';
import { Link } from 'react-router-dom';
import { routesUrl } from '../../../../app/Routes';

const CartPreview = () => {
  return (
    <Link to={routesUrl.Cart} className="header__control-btn">
        <img src="https://via.placeholder.com/40x40" alt="" />
        <span>Cart</span>
    </Link>
  );
}

export default CartPreview;
