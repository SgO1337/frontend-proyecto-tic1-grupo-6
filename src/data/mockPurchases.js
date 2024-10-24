const mockPurchases = [
    {
        id: 1,
        itemName: 'Large Popcorn',
        date: '2024-10-01T12:00:00Z',
        price: 8.50,
        type: 'snack', // Added type for the purchase
    },
    {
        id: 2,
        itemName: 'Soda (Large)',
        date: '2024-10-05T15:30:00Z',
        price: 5.00,
        type: 'snack', // Added type for the purchase
    },
    {
        id: 3,
        itemName: 'Inception',
        date: '2024-10-10T18:45:00Z',
        price: 10.00,
        type: 'movie', // Added type for the purchase
        movieId: 1, // Added movie ID to reference mockMovies
    },
    {
        id: 4,
        itemName: 'The Matrix',
        date: '2024-10-11T12:30:00Z',
        price: 10.00,
        type: 'movie', // Added type for the purchase
        movieId: 2, // Added movie ID to reference mockMovies
    },
    {
        id: 5,
        itemName: 'Large Nachos',
        date: '2024-10-12T17:00:00Z',
        price: 7.50,
        type: 'snack', // Added type for the purchase
    },
    {
        id: 6,
        itemName: 'Avatar',
        date: '2024-10-15T14:15:00Z',
        price: 12.00,
        type: 'movie', // Added type for the purchase
        movieId: 3, // Added movie ID to reference mockMovies
    },
    {
        id: 7,
        itemName: 'Medium Popcorn',
        date: '2024-10-16T11:45:00Z',
        price: 6.00,
        type: 'snack', // Added type for the purchase
    },
    {
        id: 8,
        itemName: 'Interstellar',
        date: '2024-10-17T19:30:00Z',
        price: 10.00,
        type: 'movie', // Added type for the purchase
        movieId: 4, // Added movie ID to reference mockMovies
    },
    {
        id: 9,
        itemName: 'Small Drink',
        date: '2024-10-18T16:00:00Z',
        price: 3.50,
        type: 'snack', // Added type for the purchase
    },
];

export default mockPurchases;
