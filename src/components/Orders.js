import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/orders/get-by-user-id/2');
                const fetchedOrders = response.data;

                console.log("Fetched orders:", fetchedOrders);

                // Map the orders data to match the display structure
                const mappedOrders = await Promise.all(fetchedOrders.map(async (order) => {
                    const foodItems = await Promise.all(order.orderFood.map(async (item) => {
                        try {
                            const foodResponse = await axios.get(`http://localhost:9090/api/food/view/${item.id}`);
                            return {
                                id: foodResponse.data.idFood,
                                name: foodResponse.data.name,
                                image: `data:image/jpeg;base64,${foodResponse.data.imageBASE64}`,
                                quantity: item.quantity
                            };
                        } catch (foodErr) {
                            console.error(`Error fetching food details for ID ${item.id}:`, foodErr);
                            return null; // Return null if fetching food details fails
                        }
                    }));
                    
                    // Filter out any null items (in case of fetch errors)
                    return {
                        id: order.idOrder,
                        date: order.date,
                        cancelled: order.cancelled,
                        delivered: order.delivered,
                        foodItems: foodItems.filter(item => item !== null) // Filter out nulls
                    };
                }));

                setOrders(mappedOrders);
            } catch (err) {
                console.error("Error fetching orders:", err.response ? err.response.data : err.message);
                setError('Failed to load orders. Please try again later.');
                setOrders([]); // Clear orders on error
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            {error && <p className="error-message">{error}</p>}
            {orders.length > 0 ? (
                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order.id} className="purchase-item">
                            <div className="purchase-description">
                                <p className="purchase-name">Order ID: {order.id}</p>
                                <p className="purchase-date">Date: {new Date(order.date).toLocaleDateString()}</p>
                                <p className="purchase-status">Cancelled: {order.cancelled ? 'Yes' : 'No'}</p>
                                <p className="purchase-status">Delivered: {order.delivered ? 'Yes' : 'No'}</p>
                                <h4>Items:</h4>
                                <ul>
                                    {order.foodItems.map(item => (
                                        <li key={item.id} className="food-item">
                                            <img src={item.image} alt={item.name} className="food-image" />
                                            <span>{item.name} (Quantity: {item.quantity})</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default Orders;