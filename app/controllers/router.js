const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/pages/index.html'));
});

router.get('/stores', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/pages/sucursales.html'));
});

module.exports = router;