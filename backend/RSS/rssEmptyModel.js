const xml2js = require('xml2js');
const axios = require ('axios');
const HttpError = require('../models/http-error');



const createArticles = async (URL,schema) => {

  let articles = [];

  try {
    await axios(URL).then(res => {
      const xml = res.data
      xml2js.parseString(xml,{mergeAttrs : true}, (err, result) => 
      {
        if(err) {
            throw err;
        }

        const json = JSON.stringify(result, null, 4);
        const docs = JSON.parse(json.toString());
        const items = docs.rss.channel[0].item;
        
        for (var i = 0; i < items.length; i++) { 
          articles.push(items[i]);
        }
        schema.insertMany(articles, function(err, res) {
          if (err) throw err;
          else
          {console.log("Document inserted");
          articles =[];}} )
       })})} 
  catch (err) {
    const error = new HttpError(
      'Fetching articles failed, please try again later.',
      500
    );
    return(error);
  }// key - value
    
  }

  exports.createArticles = createArticles;