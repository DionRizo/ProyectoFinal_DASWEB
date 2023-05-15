const mongoose = require('mongoose');

const StoreLocationSchema = new mongoose.Schema({
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

const StoreLocation = mongoose.model('StoreLocation', StoreLocationSchema);

module.exports = StoreLocation;