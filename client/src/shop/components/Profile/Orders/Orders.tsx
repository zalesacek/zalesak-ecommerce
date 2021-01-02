import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { routesUrl } from '../../../../app/Routes';
import AuthContext from '../../../../context/Auth/AuthContext';
import Menu from '../Menu/Menu';

const Orders = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders ] = useState<any[]>([]);

    const authContext = useContext(AuthContext);
    const userId = authContext.user._id;

    let history = useHistory();

    useEffect(() => {

        if(!authContext.isAuthenticated){
            history.push(routesUrl.Homepage)
        }

      const getOrders = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`http://localhost:3000/api/shop/orders/${userId}`);
            setOrders(res.data.data);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
        }      
      };
      getOrders()      
      // eslint-disable-next-line
    }, [authContext.isAuthenticated, history])

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
            <section className="content__product-detail">
                <div className="container">     
                    <Menu />
                    <h1>Orders</h1>     

                    {isLoading ? (
                        <p>Loading ...</p>
                    ) : (
                        orders.map((order) => (
                            <div key={order._id}>
                                <p>
                                    <strong>Created: {formatDate(order.date)}</strong>
                                    <br/>
                                    ID: {order._id}
                                </p>
                            </div>
                        ))
                    )}

                </div>
            </section>      
        </main>
    );
}

export default Orders;
