import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Product } from '../../../../app/Types';
import '../../../styles/layout/products-list.scss';

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
        <section className="content__products">
          <div className="container">
            <h1>ProductsList</h1>
            <div className="products-list">
              {isLoading ? (
                <p>Loading ...</p>
              ) : (
                products.map((item) => (
                  <ProductCard key={item._id} item={item} />
                ))
              )}
            </div>
          </div>
        </section>                      
    </main>
  );
}

export default ProductsList;
