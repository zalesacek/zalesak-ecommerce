import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Product } from '../../../../app/Types';

interface ProductParams {
    productId: string
}

const ProductDetail = () => {
    const { productId } = useParams<ProductParams>()    
    const [product, setProduct] = useState({} as Product)
    const { _id, title, imageUrl, price } = product;    
    const [isLoading, setIsLoading] = useState(true);

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

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setProduct({ ...product, [e.target.name]: e.target.value });

    const onSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        if(title === ''){
            // trigger error
        } else {
            updateProduct(product)
        }
    };

    const updateProduct = async (updateProductData: Product) => {
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };

        try {
            const res = await axios.put(`http://localhost:3000/api/shop/products/${productId}`, updateProductData, config);
            setProduct(res.data.data);     
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
            <section className="content__edit">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="product-detail">
                        <input type="text" value={_id} readOnly />    
                        <br />
                        <input type="text" value={title} name="title" onChange={onChange} />    
                        <br />
                        <input type="text" value={imageUrl} name="imageUrl" onChange={onChange} />            
                        <br />
                        <input type="number" value={price} name="price" onChange={onChange} />            
                        <br />
                        <button type="button" onClick={onSubmit}>Save changes</button>
                    </div>
                )}       
            </section>      
        </main>
    );
}

export default ProductDetail;
