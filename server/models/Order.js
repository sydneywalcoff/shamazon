const { Schema, Types, model } = require('mongoose');
// const { Product } = require('../models')

const orderSchema = new Schema({
    purchaseDate: {
        type: Date,
        default: Date.now()
    },
    products: [
        {
            type: Types.ObjectId,
            ref: 'Product'
        }
    ]
});

const Order = model('Order', orderSchema);

module.exports = Order;