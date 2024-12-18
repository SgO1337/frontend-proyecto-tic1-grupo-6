import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Snacks = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [foods, setFoods] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [quantities, setQuantities] = useState({}); // Store quantities for each food item
    const [userId, setUserId] = useState(null); // State to hold user ID


    useEffect(() => {
        // Retrieve user ID from local storage
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.error('User ID not found in local storage.');
            // Optionally navigate to login page or show an error
            navigate('/login');
        }

        // Fetch data from API
        axios.get('https://backend-proyecto-tic1-grupo-6.onrender.com/api/food')
            .then(response => {
                setFoods(response.data);
                // Extract unique categories
                const uniqueCategories = [...new Set(response.data.map(food => food.type))];
                setCategories(uniqueCategories);

                // Initialize quantities state
                const initialQuantities = response.data.reduce((acc, food) => {
                    acc[food.idFood] = 0; // Initialize to 0
                    return acc;
                }, {});
                setQuantities(initialQuantities);
            })
            .catch(error => console.error("Error fetching food data:", error));
    }, [navigate]); // Include navigate in the dependencies

    const handleQuantityChange = (idFood, delta) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [idFood]: Math.max(0, (prevQuantities[idFood] || 0) + delta) // Prevent negative quantity
        }));
    };

    const handleOrder = () => {
        const date = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const orderFood = Object.entries(quantities)
            .filter(([idFood, quantity]) => quantity > 0) // Only include items with quantity > 0
            .map(([idFood, quantity]) => ({
                food: { idFood: parseInt(idFood) },
                quantity
            }));

        const orderData = {
            user: {
                idUser : userId
            },
            cancelled: false,
            delivered: false,
            date,
            orderFood
        };

        // Log the request to the console
        console.log("Order Request Data:", JSON.stringify(orderData, null, 2));

        // Make POST request
        axios.post('https://backend-proyecto-tic1-grupo-6.onrender.com/api/orders/create', orderData)
            .then(response => {
                console.log("Order placed successfully:", response.data);
                // Reset quantities after order
                setQuantities({});
                // Navigate back to My Purchases page
                navigate('/mypurchases'); // Change this path if your home route is different
            })
            .catch(error => console.error("Error placing order:", error));
    };

    const filteredFoods = foods.filter(food => {
        const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? food.type === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    return (
        <div>
            <h2>Snacks Menu</h2>
            <div>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={inputStyle}
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={selectStyle}
                >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <br /><br />
            <div style={gridContainerStyle}>
                {filteredFoods.map((food) => (
                    <div key={food.idFood} style={gridItemStyle}>
                        <img
                            src={food.imageBASE64 ? food.imageBASE64 : 'placeholder-image-url.jpg'}
                            alt={food.name}
                            style={imageStyle}
                        />
                        <h3>{food.name}</h3>
                        <p>Type: {food.type}</p>
                        <p>Price: ${food.price.toFixed(2)}</p>
                        <div style={quantityContainerStyle}>
                            <button onClick={() => handleQuantityChange(food.idFood, -1)}>-</button>
                            <span style={quantities[food.idFood] === 0 ? zeroQuantityStyle : quantityStyle}>
                                {quantities[food.idFood] || 0}
                            </span>
                            <button onClick={() => handleQuantityChange(food.idFood, 1)}>+</button>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleOrder} style={orderButtonStyle}>Order</button>
        </div>
    );
};

// CSS-in-JS for grid and image styling
const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
};

const gridItemStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
};

const imageStyle = {
    width: '100%',
    height: 'auto',
    maxHeight: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
};

const inputStyle = {
    marginRight: '16px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
};

const selectStyle = {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
};

const quantityContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8px',
};

const orderButtonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#1C5560',
    color: '#FBFFCD',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

// Styles for quantity display
const quantityStyle = {
    margin: '0 8px',
    fontSize: '16px',
    fontWeight: 'bold',
};

const zeroQuantityStyle = {
    margin: '0 8px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#FBFFCD',
};

export default Snacks;