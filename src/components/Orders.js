import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const Orders = () => {
    const { userId } = useUser(); // Get userId from UserContext
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            if (!userId) {
                setError('User not found');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:9090/api/orders/get-by-user-id/${userId}`);
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
                                image: `data:image/jpeg;base64,${foodResponse.data.imageBASE64}`, // Fixed this line
                                quantity: item.quantity
                            };
                        } catch (foodErr) {
                            console.error(`Error fetching food details for ID ${item.id}:`, foodErr);
                            return null; // Return null if there's an error fetching food details
                        }
                    }));
                    
                    return {
                        id: order.idOrder,
                        date: order.date,
                        cancelled: order.cancelled,
                        delivered: order.delivered,
                        foodItems: foodItems.filter(item => item !== null) // Filter out null items
                    };
                }));

                setOrders(mappedOrders);
            } catch (err) {
                console.error("Error fetching orders:", err.response ? err.response.data : err.message);
                setError('Failed to load orders. Please try again later.');
                setOrders([]);
            }
        };

        fetchOrders();
    }, [userId]); // Dependency on userId

    return (
        <div>
            {error && <p className="error-message">{error}</p>}
            {orders.length > 0 ? (
                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order.id} className="purchase-item">
                            <div className="purchase-description">
                                <p style={{ color: '#79AE92' }} className="purchase-name">Order ID: {order.id}</p>
                                <p style={{ color: '#79AE92' }} className="purchase-date">Date: {new Date(order.date).toLocaleDateString()}</p>
                                <p style={{ color: '#79AE92' }} className="purchase-status">Cancelled: {order.cancelled ? 'Yes' : 'No'}</p>
                                <p style={{ color: '#79AE92' }} className="purchase-status">Delivered: {order.delivered ? 'Yes' : 'No'}</p>
                                <h4 style={{ color: '#79AE92' }}>Items:</h4>
                                {order.foodItems.length > 0 ? (
                                    <ul>
                                        {order.foodItems.map(item => (
                                            <li key={item.id} className="food-item">
                                                <span>{item.name} (Quantity: {item.quantity})</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No food items found for this order.</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ color: '#79AE92' }}>No orders found.</p>
            )}
        </div>
    );
};

export default Orders;
