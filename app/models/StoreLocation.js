const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const storeLocationSchema = new Schema({
    pictureUrl: String,
    name: String,
    street: String,
    postalCode: String,
    city: String,
    state: String,
    telephone: String,
    daysOpen: String,
    openingTime: String,
    closingTime: String,
    googleMapsUrl: String,
});

module.exports = model('StoreLocatin', storeLocationSchema);