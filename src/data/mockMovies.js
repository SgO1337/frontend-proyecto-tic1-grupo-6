const mockMovies = [
    {
        id: 1,
        title: 'Inception',
        posterUrl: 'https://m.media-amazon.com/images/I/51zUbui+gbL._AC_SY679_.jpg',
        isAvailable: true,
        director: 'XXXXXXXX',
        duration: 'XXX min',
        genre: 'XXX',
        cast: 'XXX, XXX, XXX',
        releaseDate: 'XX/XX/XXXX',
        distributer: 'XXXXX',
        posterUrlHorizontal: 'https://i.ebayimg.com/images/g/lVMAAOSwhQheYrmk/s-l1200.jpg',
        description: '"In a world where ancient maps hold the key to a lost civilization, a daring explorer ' +
            'and a skeptical scientist must team up to uncover the truth behind a mythical island.' +
            ' As they venture into uncharted waters, they face natural disasters, rival treasure hunters, ' +
            'and their own conflicting motives. But the biggest secret lies within themselves, ' +
            'as they discover the true meaning of adventure, trust, and sacrifice.',

    },
    {
        id: 2,
        title: 'The Matrix',
        posterUrl: 'https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg',
        isAvailable: true,
        director: 'XXXXXXXX',
        duration: 'XXX min',
        genre: 'XXX',
        cast: 'XXX, XXX, XXX',
        releaseDate: 'XX/XX/XXXX',
        distributer: 'XXXXX',
        posterUrlHorizontal: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyu3gBJJj5h3X00iLqdnb9dhj6WDdE-HkBww&s',
        descrption: '"In a world where ancient maps hold the key to a lost civilization, a daring explorer ' +
            'and a skeptical scientist must team up to uncover the truth behind a mythical island.' +
            ' As they venture into uncharted waters, they face natural disasters, rival treasure hunters, ' +
            'and their own conflicting motives. But the biggest secret lies within themselves, ' +
            'as they discover the true meaning of adventure, trust, and sacrifice.',
    },
    {
        id: 3,
        title: 'Harry Potter and the Order of the Phoenix',
        posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6DX4m9ThWvIjbyFvA2jAec7mmZOYytj4-8w&s',
        isAvailable: true,
        director: 'XXXXXXXX',
        duration: 'XXX min',
        genre: 'XXX',
        cast: 'XXX, XXX, XXX',
        releaseDate: 'XX/XX/XXXX',
        distributer: 'XXXXX',
        posterUrlHorizontal: 'https://scamanderweb.com/wp-content/uploads/2020/04/050-1.jpg',
        description: '"In a world where ancient maps hold the key to a lost civilization, a daring explorer ' +
            'and a skeptical scientist must team up to uncover the truth behind a mythical island.' +
            ' As they venture into uncharted waters, they face natural disasters, rival treasure hunters, ' +
            'and their own conflicting motives. But the biggest secret lies within themselves, ' +
            'as they discover the true meaning of adventure, trust, and sacrifice.',
    },
    {
        id: 4,
        title: 'Avengers: Endgame',
        posterUrl: 'https://m.media-amazon.com/images/I/81ai6zx6eXL._AC_SY679_.jpg',
        isAvailable: true,
        director: 'XXXXXXXX',
        duration: 'XXX min',
        genre: 'XXX',
        cast: 'XXX, XXX, XXX',
        releaseDate: 'XX/XX/XXXX',
        distributer: 'XXXXX',
        posterUrlHorizontal: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyu3gBJJj5h3X00iLqdnb9dhj6WDdE-HkBww&s',
        description: '"In a world where ancient maps hold the key to a lost civilization, a daring explorer ' +
            'and a skeptical scientist must team up to uncover the truth behind a mythical island.' +
            ' As they venture into uncharted waters, they face natural disasters, rival treasure hunters, ' +
            'and their own conflicting motives. But the biggest secret lies within themselves, ' +
            'as they discover the true meaning of adventure, trust, and sacrifice.',
    },
    {
        id: 5,
        title: 'Garfield',
        posterUrl: 'https://cartelera.montevideo.com.uy/imagenes_espectaculos/moviecat13/36467.jpg',
        isAvailable: true,
        director: 'XXXXXXXX',
        duration: 'XXX min',
        genre: 'XXX',
        cast: 'XXX, XXX, XXX',
        releaseDate: 'XX/XX/XXXX',
        distributer: 'XXXXX',
        description: '"In a world where ancient maps hold the key to a lost civilization, a daring explorer ' +
            'and a skeptical scientist must team up to uncover the truth behind a mythical island.' +
            ' As they venture into uncharted waters, they face natural disasters, rival treasure hunters, ' +
            'and their own conflicting motives. But the biggest secret lies within themselves, ' +
            'as they discover the true meaning of adventure, trust, and sacrifice.',
        posterUrlHorizontal: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyu3gBJJj5h3X00iLqdnb9dhj6WDdE-HkBww&s'
    },
    {
        id: 6,
        title: 'Intensamente 2',
        posterUrl: 'https://cartelera.montevideo.com.uy/imagenes_espectaculos/moviecat13/36649.jpg',
        isAvailable: true,
        director: 'XXXXXXXX',
        duration: 'XXX min',
        genre: 'XXX',
        cast: 'XXX, XXX, XXX',
        releaseDate: 'XX/XX/XXXX',
        distributer: 'XXXXX',
        description: '"In a world where ancient maps hold the key to a lost civilization, a daring explorer ' +
            'and a skeptical scientist must team up to uncover the truth behind a mythical island.' +
            ' As they venture into uncharted waters, they face natural disasters, rival treasure hunters, ' +
            'and their own conflicting motives. But the biggest secret lies within themselves, ' +
            'as they discover the true meaning of adventure, trust, and sacrifice.',
        posterUrlHorizontal: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyu3gBJJj5h3X00iLqdnb9dhj6WDdE-HkBww&s'
    },
    {
        id: 7,
        title: 'Mi villano favorito 4',
        posterUrl: 'https://cartelera.montevideo.com.uy/imagenes_espectaculos/moviecat13/36650.jpg',
        isAvailable: true,
        director: 'XXXXXXXX',
        duration: 'XXX min',
        genre: 'XXX',
        cast: 'XXX, XXX, XXX',
        releaseDate: 'XX/XX/XXXX',
        distributer: 'XXXXX',
        description: '"In a world where ancient maps hold the key to a lost civilization, a daring explorer ' +
            'and a skeptical scientist must team up to uncover the truth behind a mythical island.' +
            ' As they venture into uncharted waters, they face natural disasters, rival treasure hunters, ' +
            'and their own conflicting motives. But the biggest secret lies within themselves, ' +
            'as they discover the true meaning of adventure, trust, and sacrifice.',
        posterUrlHorizontal: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyu3gBJJj5h3X00iLqdnb9dhj6WDdE-HkBww&s'
    },
    {
        id: 8,
        title: 'Rápidos y furiosos 9',
        posterUrl: 'https://static.wixstatic.com/media/d56791_a520ebeb2d3647d1910d54a4a5072cb9~mv2.jpeg/v1/fill/w_687,h_974,al_c,q_85,enc_auto/d56791_a520ebeb2d3647d1910d54a4a5072cb9~mv2.jpeg',
        isAvailable: true,
        director: 'XXXXXXXX',
        duration: 'XXX min',
        genre: 'XXX',
        cast: 'XXX, XXX, XXX',
        releaseDate: 'XX/XX/XXXX',
        distributer: 'XXXXX',
        description: '"In a world where ancient maps hold the key to a lost civilization, a daring explorer ' +
            'and a skeptical scientist must team up to uncover the truth behind a mythical island.' +
            ' As they venture into uncharted waters, they face natural disasters, rival treasure hunters, ' +
            'and their own conflicting motives. But the biggest secret lies within themselves, ' +
            'as they discover the true meaning of adventure, trust, and sacrifice.',
        posterUrlHorizontal: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyu3gBJJj5h3X00iLqdnb9dhj6WDdE-HkBww&s'
    }
];

export default mockMovies