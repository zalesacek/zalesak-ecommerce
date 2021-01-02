import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../styles/layout/tables.scss';
import { routesUrl } from '../../../../app/Routes';
import { Link } from 'react-router-dom';

const OrdersList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        const getOrders = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get("http://localhost:3000/api/shop/orders");
                setOrders(res.data.data);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
            }
        };
        getOrders()
        // eslint-disable-next-line
    }, [])

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
            <h1>OrdersList</h1>

            <table className="table-grid">
                <thead>
                    <tr>
                        <th>Created</th>
                        <th>Id</th>
                        <th className="table-grid__actions">&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={3}>Loading</td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <tr key={order._id}>
                                <td>{formatDate(order.date)}</td>
                                <td><Link to={routesUrl.AdminOrderDetail + order._id}>{order._id}</Link></td>
                                <td className="table-grid__actions">&nbsp;</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </main>
    );
}

export default OrdersList;
