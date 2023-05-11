const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const codeSchema = new Schema({
    code: String,
    discountPercentage: String,
    creationDate: String,
    validIn: String,
    validFrom: String,
    validUntil: String,
});

module.exports = model('DiscountCode', codeSchema);