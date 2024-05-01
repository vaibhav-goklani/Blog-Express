const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');

const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const connectToMongoDB = require('./connect');
const Blog = require('./models/blog');

const PORT = process.env.PORT || 8001;
const app = express();

// CONNECTIONS
connectToMongoDB(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB"));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')));

// ROUTE DEFINITIONS
app.get('/', async (req, res) => {
    const allBlogs = await Blog.find().sort('createdAt');
    res.render('home', {
        user: req.user,
        blogs: allBlogs
    });
});

app.use('/user', userRoute);

app.use('/blog', blogRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    console.log(`http://localhost:${PORT}`);
});