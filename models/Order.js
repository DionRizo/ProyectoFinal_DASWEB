const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderType: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    genres: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        default: 25
    },
    dateOfPurchase: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date
    },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;