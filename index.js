const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();

const userRoute = require('./routes/user');
const connectToMongoDB = require('./connect');

const PORT = process.env.PORT || 8001;
const app = express();

// CONNECTIONS
connectToMongoDB(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB"));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));

// ROUTE DEFINITIONS
app.get('/', (req, res) => {
    res.render('home');
});

app.use('/user', userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    console.log(`http://localhost:${PORT}`);
});