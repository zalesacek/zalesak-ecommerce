import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { routesUrl } from '../../../../app/Routes';
import { Product } from '../../../../app/Types';

const ProductRow = (props: {item: Product}) => {

  const onDelete = async () => {
    try {
        await axios.delete(`http://localhost:3000/api/shop/products/${props.item._id}`);        
    } catch (err) {
        console.error(err);
    }
  }

  return (
    <tr>
      <td>
        <NavLink to={routesUrl.AdminProductDetail + props.item._id} className="table-grid-item">
            <div className="table-grid-item__image">
                <img src={props.item.imageUrl} alt={props.item.title} />
            </div>
            <div className="table-grid-item__content">
                <h2 className="table-grid-item__title">{props.item.title}</h2>         
                <small>ID: {props.item._id}</small>       
            </div>
        </NavLink>
      </td>
      <td>
        <button type="button" onClick={onDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default ProductRow;
