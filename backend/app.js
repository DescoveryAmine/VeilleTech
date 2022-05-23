const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const rssmodel1 = require('./rss/clientmodel1');
const rssmodel2 = require('./rss/clientmodel2');
const URLS = require('./config/urls');

const newsRoutes = require('./routes/news-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');
const InfoCollection = require('./models/informatique');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;
const {  infourls, elctrourls, mecanurls} = URLS;


app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/news', newsRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect(db,{ useNewUrlParser: true ,useUnifiedTopology: true})
  .then(() => {
    infourls.forEach(element =>{
      Object.keys(element).forEach(key => {
        if(key==='Link')
        {rssmodel2.createArticles(element[key],InfoCollection)}// key - value
    })
  });
  app.listen(5000);
  console.log("server running on 5000");
  })
  .catch(err => {
    console.log(err);
  });

