const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//variable necesaria para encriptar la contraseña.(¡No modificar la variable!)
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});


//Guarda la contraseña encriptada.
UserSchema.pre('save', function(next) {
  if(this.isNew || this.isModified('password')) {
    const document = this;
    bcrypt.hash(document.password, saltRounds, function(err, hashedPassword) {
      if(err) {
        next(err);
      }
      else {
        document.password = hashedPassword;
        next();
      }
    });
  }else{
    next();
  }
});


//Verifica que la contraseña sea correcta.
UserSchema.methods.isCorrectPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, same) {
    if(err) {
      callback(err);
    }
    else {
      callback(err, same);
    }
  }
)};

module.exports = mongoose.model('User', UserSchema);




/*
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

*/