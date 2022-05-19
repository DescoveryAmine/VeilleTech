const xml2js = require('xml2js');
const axios = require ('axios');
const mongoose = require('mongoose');
const rssmodel1 = require('./rss/clientmodel1');
const rssmodel2 = require('./rss/clientmodel2');
const infourls = require('./config/urls').infourls;
// DB Config
const db = require('./config/keys').mongoURI;

const InfoCollection = require('./models/informatique');

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

infourls.push("https://www.lemonde.fr/economie/rss_full.xml") ;

infourls.forEach(element =>{rssmodel2.createArticles(element,InfoCollection)});