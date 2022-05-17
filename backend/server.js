const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/users');
const profile = require('./routes/profile');
const NewsArticles = require('./routes/newsarticles');
const NewsFields = require('./routes/newsfields');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/users', users);
app.use('/profile', profile);
app.use('/news/news-fields', NewsFields);
app.use('/news/news-articles', NewsArticles);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
