import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import ProductRow from './ProductRow';
import { routesUrl } from '../../../../app/Routes';
import { Product } from '../../../../app/Types';
import '../../../styles/layout/tables.scss';

const ProductsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts ] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
          const res = await axios.get("http://localhost:3000/api/shop/products");          
          setProducts(res.data.data);
          setIsLoading(false);
      } catch (err) {
          console.error(err);
      }      
    };
    getProducts()      
    // eslint-disable-next-line
  }, [])

  return (
    <main
        className="content"
        role="main"
        itemScope={undefined}
        itemProp="mainContentOfPage"
    >
        <h1>ProductsList</h1>
        
        <p>
          <NavLink to={routesUrl.AdminCreateProduct}>Add new product</NavLink>
        </p>

        <table className="table-grid">
          <thead>
            <tr>
              <th>Item</th>
              <th className="table-grid__actions">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={2}>
                    Loading
                  </td>
                </tr> 
              ) : (
                products.map((item) => (
                  <ProductRow key={item._id} item={item} />
                ))
              )}
          </tbody>
        </table>        
    </main>
  );
}

export default ProductsList;
