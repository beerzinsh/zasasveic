const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const path = require('path'); // Pievienojiet šo rindu
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secretkey', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce');

// Passport configuration
require('./config/passport');

// Serve static files
app.use(express.static(path.join(__dirname, 'public'))); // Pievienojiet šo rindu
app.use(express.static(__dirname)); // Serve static files from the root directory

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Atjauniniet šo rindu
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/profile.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'profile.html'));
});

app.get('/cart.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'cart.html'));
});

app.get('/checkout.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'checkout.html'));
});

const userRoutes = require('./routes/user');
app.use('/user', userRoutes);

const paymentRoutes = require('./routes/payment');
app.use('/payment', paymentRoutes);

const socialLoginRoutes = require('./routes/socialLogin');
app.use('/auth', socialLoginRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
