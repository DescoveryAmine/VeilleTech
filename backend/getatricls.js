const mongoose = require('mongoose');
const rssmodel1 = require('./rss/clientmodel1');
const rssmodel2 = require('./rss/clientmodel2');
const infoUrls = require('./config/urls');
// DB Config
const db = require('./config/keys').mongoURI;

const {infourls, elctrourls, mecanurls} = infoUrls;

const InfoCollection = require('./models/informatique');

// Connect to MongoDB
mongoose
  .connect(db,{ useNewUrlParser: true ,useUnifiedTopology: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

infourls.push("https://www.lemonde.fr/economie/rss_full.xml") ;

infourls.forEach(element =>{rssmodel2.createArticles(element,InfoCollection)});