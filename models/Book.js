const mongoose = require('mongoose');


const BookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Please add a title'],
    },
    author:{
        type: String,
        required: [true, 'Please add an author'],
    },
    genre:{
        type: String,
        required: [true, 'Please add a genre'],
    },
    price:{
        type: Number,
        required: [true, 'Please add a price'],
    },
    inStock:{
        type: Boolean,
        default: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;