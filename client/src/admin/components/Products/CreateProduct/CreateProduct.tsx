import React, { useState } from 'react';
import axios from 'axios';
import { Product } from '../../../../app/Types';

const CreateProduct = () => {
    const [product, setProduct] = useState({} as Product)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setProduct({ ...product, [e.target.name]: e.target.value });

    const onSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        if(product.title === ''){
            // trigger error
        } else {
            createProduct(product)
        }
    };

    const createProduct = async (productData: Product) => {
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };

        try {
            console.log(productData)
            const res = await axios.post(`http://localhost:3000/api/shop/create-product`, productData, config);            
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
                <div className="product-detail">
                    <input type="text" value={product.title} name="title" onChange={onChange} placeholder="Title" />    
                    <br />
                    <input type="text" value={product.imageUrl} name="imageUrl" onChange={onChange} placeholder="Image URL" />            
                    <br />
                    <input type="number" value={product.price} name="price" onChange={onChange} placeholder="Price" />            
                    <br />
                    <button type="button" onClick={onSubmit}>Create a new product</button>
                </div>       
            </section>      
        </main>
    );
}

export default CreateProduct;
