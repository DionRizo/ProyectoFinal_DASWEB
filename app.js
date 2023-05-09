const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const PORT = 3000;

app.use(express.json());
app.use(express.static('app'));
app.use('/views', express.static('views'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'app/views/pages/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
