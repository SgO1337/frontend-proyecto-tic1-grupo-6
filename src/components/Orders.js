import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const Orders = () => {
    const { userId } = useUser(); // Get userId from UserContext
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!userId) {
                setError('User not found');
                return;
            }

            try {
                const response = await axios.get(`https://backend-proyecto-tic1-grupo-6.onrender.com/api/orders/get-by-user-id/${userId}`);
                const fetchedOrders = response.data;

                console.log("Fetched orders:", fetchedOrders);
                setLoading(false);

                // Map the orders data to match the display structure
                const mappedOrders = await Promise.all(fetchedOrders.map(async (order) => {
                    const foodItems = await Promise.all(order.orderFood.map(async (item) => {
                        const food = item.food; // Access the food object directly
                        return {
                            id: food.idFood,
                            name: food.name,
                            type: food.type,
                            price: food.price,
                            image: `data:image/jpeg;base64,${food.imageBASE64}`,
                            quantity: item.quantity
                        };
                    }));

                    return {
                        id: order.idOrder,
                        user: {
                            idUser: order.user.idUser,
                            name: order.user.name,
                            surname: order.user.surname,
                            email: order.user.email,
                            age: order.user.age,
                            role: order.user.role,
                            ci: order.user.ci,
                        },
                        cancelled: order.cancelled,
                        delivered: order.delivered,
                        date: order.date,
                        foodItems: foodItems.filter(item => item !== null) // Filter out null items
                    };
                }));

                setOrders(mappedOrders);
            } catch (err) {
                console.error("Error fetching orders:", err.response ? err.response.data : err.message);
                setError('Failed to load orders. Please try again later.');
                setOrders([]);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]); // Dependency on userId

    return (
        <div>
            {error && <p className="error-message">{error}</p>}
            {isLoading && <p style={{ color: '#79AE92' }}>Loading...</p>}
            {orders.length > 0 ? (
                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order.id} className="purchase-item">
                            <div className="purchase-description">
                                <p style={{ color: '#79AE92' }} className="purchase-name">Order ID: {order.id}</p>
                                <p style={{ color: '#79AE92' }} className="purchase-date">Date: {new Date(order.date).toLocaleString()}</p>
                                <p style={{ color: '#79AE92' }} className="purchase-status">Cancelled: {order.cancelled ? 'Yes' : 'No'}</p>
                                <p style={{ color: '#79AE92' }} className="purchase-status">Delivered: {order.delivered ? 'Yes' : 'No'}</p>
                                <h4 style={{ color: '#79AE92' }}>Items:</h4>
                                {order.foodItems.length > 0 ? (
                                    <ul>
                                        {order.foodItems.map(item => (
                                            <li style={{ color: '#79AE92' }}key={item.id} className="food-item">
                                                <span style={{ color: '#79AE92' }}>{item.name} (Type: {item.type}, Quantity: {item.quantity})</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p style={{ color: '#79AE92' }}>No food items found for this order.</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : !isLoading &&(
                <p style={{ color: '#79AE92' }}>No orders found.</p>
            )}
        </div>
    );
};

export default Orders;
