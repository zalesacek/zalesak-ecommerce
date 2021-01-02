import React from 'react';
import { NavLink } from 'react-router-dom';
import { routesUrl } from '../../../../app/Routes';
import { Product } from '../../../../app/Types';
import '../../../styles/components/product-card.scss';

const ProductsCard = (props: {item: Product}) => {
  return (
    <article className="products-list__item">
        <NavLink to={routesUrl.ProductDetail + props.item._id} className="product-card">
            <div className="product-card__image">
                <img src={props.item.imageUrl} alt={props.item.title} />
            </div>
            <div className="product-card__content">
                <h2 className="product-card__title">{props.item.title}</h2>      
                <p className="product-card__price">{props.item.price.toString()} Kč</p>                
            </div>
        </NavLink>
    </article>
  );
}

export default ProductsCard;
