const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();
app.use(express.static('public'));
app.use(express.static('controllers'));

// Passport config
require(('./config/passport'))(passport);

// DB Config
const db = require(path.join(__dirname, '/config/keys')).MongoURI;

//connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// BodyParser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Routes
app.use('/', require(path.join(__dirname, '/routes/indexRoute')));
app.use('/admin', require(path.join(__dirname, '/routes/adminRoute')));
app.use('/stores', require(path.join(__dirname, '/routes/storesRoute')));
app.use('/cart', require(path.join(__dirname, '/routes/shoppingCartRoute')));
app.use('/users', require(path.join(__dirname, '/routes/usersRoute')));
app.use('/search', require(path.join(__dirname, '/routes/searchRoute')));

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`App listening on port ${PORT}`));