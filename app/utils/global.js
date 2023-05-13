const User = require("../models/User");

const login = async (username, password) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.log('User not found');
      return null;
    } else {
      return new Promise((resolve, reject) => {
        user.isCorrectPassword(password, (err, result) => {
          if (err) {
            console.log(err);
            resolve(null); // Resolvemos con valor nulo en caso de error
          } else {
            console.log({ result });
            console.log('User');
            console.log({ user });
            resolve(user); // Resolvemos con el usuario en caso de éxito
          }
        });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al autenticar al usuario, por favor intente de nuevo.");
  }
};


module.exports = {
    login
}