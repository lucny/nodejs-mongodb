const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/book');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());


mongoose.connect('mongodb://admin:secret@db:27017/mymongo?authSource=admin')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});


// Insert books into the database
const books = [
    {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        year: 1951
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        year: 1960
    },
    {
        title: "1984",
        author: "George Orwell",
        year: 1949
    },
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        year: 1925
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        year: 1813
    }
];

// Insert multiple documents (books) into the collection
Book.insertMany(books)
    .then(() => {
        console.log('Books inserted successfully');
    })
    .catch((err) => {
        console.error('Error inserting books:', err);
    });

// Route to fetch all books
app.get('/books', async (req, res) => {
    try {
        // Fetch all books from the database
        const books = await Book.find();
        res.json(books); // Respond with the list of books as JSON
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/hello', (req, res) => {
    res.json({message: "Povedlo se"}); 
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


