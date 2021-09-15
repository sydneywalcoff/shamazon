const db = require('./connection');
const { Category, Product } = require('../models');

db.once('open', async () => {
    await Category.deleteMany();

    const categories = await Category.insertMany([
        { name: 'Electronics' },
        { name: 'Household Goods' },
        { name: 'Clothing' },
        { name: 'Books' },
        { name: 'Pet Goods' }
    ]);

    console.log('Categories seeded!');

    await Product.deleteMany();

    await Product.insertMany([
        {
            name: 'Nintendo Switch',
            description: 'The Nintendo Switch is a video game console developed by Nintendo and released worldwide in most regions on March 3, 2017. The console itself is a tablet that can either be docked for use as a home console or used as a portable device, making it a hybrid console.',
            image: '',
            category: categories[0]._id,
            price: 299.99,
            quantity: 15
        },
        {
            name: 'Animal Crossing',
            description: 'Animal Crossing is a social simulation video game series developed and published by Nintendo. The series was conceptualized and created by Katsuya Eguchi and Hisashi Nogami. In Animal Crossing, the player character is a human who lives in a village inhabited by various anthropomorphic animals, carrying out various activities such as fishing, bug catching, and fossil hunting.',
            image: '',
            category: categories[0]._id,
            price: 59.99,
            quantity: 27
        },
        {
            name: 'Playstation 5',
            description: 'The PlayStation 5 is a home video game console developed by Sony Interactive Entertainment. Announced in 2019 as the successor to the PlayStation 4, the PS5 was released on November 12, 2020, in Australia, Japan, New Zealand, North America, and South Korea, with worldwide release following a week later.',
            image: '',
            category: categories[0]._id,
            price: 499.99,
            quantity: 1
        },
        {
            name: 'Cotton Beanie',
            description: 'Comfortable pom pom beanie available in Black to keep your ears warm in the winter',
            image: '',
            category: categories[2]._id,
            price: 9.99,
            quantity: 132
        },
        {
            name: 'Sandlewood Candle',
            description: 'Wonderful candle to brighten the scent in any room',
            image: '',
            category: categories[1]._id,
            price: 17.95,
            quantity: 11
        },
        {
            name: 'The Picture of Dorian Gray by Oscar Wilde',
            description: 'A spooky story about the price of vanity.',
            image: '',
            category: categories[3]._id,
            price: 12.39,
            quantity: 37
        },
        {
            name: 'Kong Puzzle Dog Toy',
            description: 'Classic red kong toy to keep your bestie busy for hours!',
            image: '',
            category: categories[4]._id,
            price: 8.79,
            quantity: 56
        }
    ]);
    console.log('Products seeded!');

    process.exit();
});