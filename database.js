const mongoose = require('mongoose');
const mongoConnection = "mongodb+srv://CinemaSurfAdmin:giq1pqvGDDFrDaek@cinemasurfdb.yqvttyu.mongodb.net/movies?retryWrites=true&w=majority";

mongoose.connect(mongoConnection, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('connecting', function () {
  console.log("Conectando a base de datos...");
  console.log(mongoose.connection.readyState);
});

db.on('connected', function () {
  console.log("Conectado a base de datos exitosamente!");
  console.log(mongoose.connection.readyState);
});