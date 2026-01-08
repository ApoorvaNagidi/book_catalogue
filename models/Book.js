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
    
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;