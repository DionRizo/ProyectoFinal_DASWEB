const express = require('express');
const router = express.Router();

// Cart page
router.get('/', (req, res) => res.render('cartView', { url: req.originalUrl }));

module.exports = router;