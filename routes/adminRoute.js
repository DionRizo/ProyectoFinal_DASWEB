const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());

function isAdmin(req, res, next) {
    // If the user is logged in
    if (req.isAuthenticated()) {
        // If the user's role is admin
        if (req.user.administrator == true) {
            return next();
        } else {
            res.redirect("/"); // Redirect non-admin users
        }
    } else {
        res.redirect("/"); // Redirect non-admin users
    }
}

// Admin page
router.get('/', isAdmin, (req, res) => res.render('adminView', { url: req.originalUrl }));

module.exports = router;