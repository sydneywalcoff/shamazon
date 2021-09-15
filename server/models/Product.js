const { Schema, Types, model } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 0.05
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0
    },
    category: {
        type: Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

const Product = model('Product', productSchema);

module.exports = Product;