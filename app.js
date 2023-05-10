const express = require('express');
const router = require("./app/controllers/router.js");

const app = express();
const PORT = 3000;

const database = require('./database');

app.use(express.json());
app.use(express.static('app'));
app.use('/views', express.static('views'));
app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
