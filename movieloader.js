const mongoose = require('mongoose');
const mongoConnection = "mongodb+srv://CinemaSurfAdmin:giq1pqvGDDFrDaek@cinemasurfdb.yqvttyu.mongodb.net/";
const db = mongoose.connection;

db.on('connecting', function () {
    console.log("Conectando...");
    console.log(mongoose.connection.readyState);
});

db.on('connected', function () {
    console.log("Conectado exitosamente!");
    console.log(mongoose.connection.readyState);
});

mongoose.connect(mongoConnection, { useNewUrlParser: true });

const MovieDB = require('node-themoviedb');
let apikey = '398ac7078932175128202baf1d489b77'
const mdb = new MovieDB(apikey);

(async () => {
    try {
      const args = {
        pathParameters: {
          list_id: 8252597,
        },
      };
      const list = await mdb.list.getDetails(args);
      console.log(list);
    } catch (error) {
      console.error(error);
    }
  })();