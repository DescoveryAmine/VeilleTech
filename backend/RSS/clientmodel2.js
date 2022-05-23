const xml2js = require('xml2js');
const axios = require ('axios');




const createArticles = async (URL,schema) => {
axios(URL).then(res => {
  const xml = res.data
  xml2js.parseString(xml,{mergeAttrs : true}, (err, result) => {
    if(err) {
        throw err;
    }
    const json = JSON.stringify(result, null, 4);
    const docs = JSON.parse(json.toString());
    const items = docs.rss.channel[0].item;
    const articles = [];
    for (var i = 0; i < items.length; i++) {
      articles.push(items[i]);
    //const img=items[i]['media:content'][0]['$'].url; 
    }
    schema.insertMany(articles, function(err, res) {
      if (err) {
        console.log(err);
        return;}
      else
      console.log("Document inserted");
      articles =[];

       } )
    
    
      
    })})
  }

  exports.createArticles = createArticles;