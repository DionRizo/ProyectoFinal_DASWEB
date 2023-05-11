const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  cart: [
    {
      movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
      quantity: Number,
    },
  ],
  previousOrders: [
    {
      movies: [
        {
          movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",
          },
          quantity: Number,
        },
      ],
      total: Number,
      date: Date,
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);