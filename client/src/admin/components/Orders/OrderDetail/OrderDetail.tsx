import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Order } from '../../../../app/Types';

interface OrderParams {
    orderId: string
}

const OrderDetail = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { orderId } = useParams<OrderParams>()    
    const [order, setOrder] = useState({} as Order)

    useEffect(() => {
        const getOrder = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`http://localhost:3000/api/shop/order-detail/${orderId}`);          
                setOrder(res.data.data);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
            }      
        };
        getOrder()      
        // eslint-disable-next-line
    }, [orderId])

    const formatDate = (orderDate: Date) => {
        return new Date(orderDate).toLocaleString();
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
                        <h1>Order ID: {order._id}</h1>
                        <h2>Created: {formatDate(order.date)}</h2>
                    </div>
                )}       
            </section>      
        </main>
    );
}

export default OrderDetail;
