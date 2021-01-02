import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Product } from '../../../../app/Types';
import CartContext from '../../../../context/Cart/CartContext';

interface ProductParams {
    productId: string
}

const ProductDetail = () => {
    const { productId } = useParams<ProductParams>()    
    const [product, setProduct] = useState({} as Product)
    const { _id, title, imageUrl, price } = product;    
    const [isLoading, setIsLoading] = useState(true);
    const cartContext = useContext(CartContext);

    useEffect(() => {
        const getProduct = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`http://localhost:3000/api/shop/products/${productId}`);          
            setProduct(res.data.data);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
        }      
        };
        getProduct()      
        // eslint-disable-next-line
    }, [productId])

    const addCartClick = () => {
        try {
            cartContext.addToCart(_id)
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <main
            className="content"
            role="main"
            itemScope={undefined}
            itemProp="mainContentOfPage"
        >
            <section className="content__product-detail">
                <div className="container">     
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="products-detail">
                            <div className="product-detail__wide">
                                <h1>{title}</h1>
                                <p>ID: {_id}</p>  
                            </div>
                            <div className="product-detail__gallery">
                                <img src={imageUrl} alt={title} />
                            </div>
                            <div className="product-detail__content">
                                <p>Price: {price.toString()} Kč</p>
                                <button type="button" className="buy-btn" onClick={addCartClick}>
                                    <span>Add to cart</span>
                                </button>
                            </div>                                                
                        </div>
                    )}                                   
                </div>
            </section>      
        </main>
    );
}

export default ProductDetail;
