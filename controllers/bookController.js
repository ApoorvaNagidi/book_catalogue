const Book = require('../models/Book');

const createBook = async (req, res) => {
    const { title, author, genre, price, inStock } = req.body;
    if (!title || !author || !genre || price == null || inStock == null) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const book = await Book.create({
        title,
        author,
        genre,
        price,
        inStock,
        user: req.user._id,
    });

    res.status(201).json(book);
};

const getBooks = async (req, res) => {
    const books = await Book.find({});
    res.status(200).json(books);
};

const getBookById = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });

    }
};

const updateBook = async (req, res) => {
    const book= await Book.findById(req.params.id);
    if (book) {
         
        
        if (!book.user) {
            return res.status(403).json({ message: 'Book record is missing owner data. Update denied.' });
        }

        if (book.user.toString() !== req.user._id.toString()){
            return  res.status(403).json({ message: 'Not authorized to update this book' });
        }

        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json(updatedBook);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
};

const deleteBook = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
        if (book.user.toString() !== req.user.id){
            return  res.status(403).json({ message: 'Not authorized to delete this book' });
        }
        await book.deleteOne({_id: req.params.id});
        res.status(200).json({ message: 'Book removed' });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
};
module.exports = { createBook, getBooks, getBookById, updateBook, deleteBook };

