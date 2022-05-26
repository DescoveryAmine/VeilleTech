const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const rssmodel_0 = require('./RSS/rssEmptyModel');
const rssmodel_1 = require('./RSS/rssModelOne');
const rssmodel_2 = require('./RSS/rssModelTow');
const URLS = require('./config/urls');

const newsRoutes = require('./routes/si-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');
const InfoCollection = require('./models/informatique');
const ElectroCollection = require('./models/electronique');
const MecaCollection = require('./models/mecanique');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;
const {  infourls, elctrourls, mecaurls} = URLS;


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

const fetchNews = (URL,Schema) =>{
  URL.forEach(element =>{
    switch (element['Mid']) {
      case 1:
        rssmodel_1.createArticles(element['Link'],Schema);
        break;
      case 2:
        rssmodel_2.createArticles(element['Link'],Schema);
        break;
      default:
      rssmodel_0.createArticles(element['Link'],Schema);

};
})
};

mongoose
  .connect(db,{ useNewUrlParser: true ,useUnifiedTopology: true})
  .then(() => {
    fetchNews(mecaurls,MecaCollection);
    fetchNews(infourls,InfoCollection);
    fetchNews(elctrourls,ElectroCollection);
  
  app.listen(5000);
  console.log("server running on 5000");
  })
  .catch(err => {
    console.log(err);
  });


