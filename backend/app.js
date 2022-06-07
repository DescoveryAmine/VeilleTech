const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const rssmodel_0 = require('./RSS/rssEmptyModel');
const rssmodel_1 = require('./RSS/rssModelOne');
const rssmodel_2 = require('./RSS/rssModelTow');
const URLS = require('./config/urls');
const path = require('path');

const newsRoutes = require('./routes/si-routes');
const newsFieldsRoutes = require('./routes/news/fields-routes');
const newsArticlesRoutes = require('./routes/news/articles-routes');
const usersRoutes = require('./routes/users-routes');
const humansRoutes = require('./routes/assets/humans-routes');
const HttpError = require('./models/http-error');
const InfoCollection = require('./models/informatique');
const ElectroCollection = require('./models/electronique');
const MecaCollection = require('./models/mecanique');
const neo4j = require ('neo4j-driver');
const REACT_APP_NEO4J_URI = require('./config/keys').NEO4J_URI;
const REACT_APP_NEO4J_USER = require('./config/keys').NEO4J_USER;
const REACT_APP_NEO4J_PASSWORD = require('./config/keys').NEO4J_PASSWORD;

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;
const {  infourls, elctrourls, mecaurls} = URLS;
 //default rss fields img
 const infoImg = 'http://localhost:5000/models/img/informatique.jpg';
 const electroImg = 'http://localhost:5000/models/img/electronique.jpg';
 const mecaImg = 'http://localhost:5000/models/img/mecanique.jpg';

app.use(bodyParser.json());

app.use('/models/img', express.static(path.join('models', 'img')));

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
app.use('/api/news/news-fields', newsFieldsRoutes);
app.use('/api/news/news-articles', newsArticlesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/assets/humans', humansRoutes);

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

const fetchNews = (URL,Schema,imgSrc) =>{
  URL.forEach(element =>{
    switch (element['Mid']) {
      case 1:
        rssmodel_1.createArticles(element['Link'],Schema,imgSrc);
        break;
      case 2:
        rssmodel_2.createArticles(element['Link'],Schema,imgSrc);
        break;
      default:
       rssmodel_0.createArticles(element['Link'],Schema,imgSrc);

};
})
};

const rebuildcommunities = async ()=>{

  const driver = neo4j.driver(
    REACT_APP_NEO4J_URI,
    neo4j.auth.basic(
        REACT_APP_NEO4J_USER,
        REACT_APP_NEO4J_PASSWORD
    )
  )
  console.log("CALLING recycle communities");
  const session = driver.session();
  const tx = session.beginTransaction();
  {

    tx
    .run(`CALL gds.graph.project(
      'myGraph',                    
      ['UTILISATEUR','Domain'],                             
      {Link: {orientation: 'UNDIRECTED',properties:'weight'}})
      YIELD
      graphName AS graph,
      relationshipProjection AS knowsProjection,
      nodeCount AS nodes,
      relationshipCount AS rels;`);
      tx
      .run(`CALL apoc.periodic.iterate(
        "MATCH (s) WHERE (s:UTILISATEUR) OR s:Domain RETURN s",
        "CALL gds.allShortestPaths.dijkstra.write('myGraph', {
        searchDeph : 1,
        sourceNode: s,
        relationshipWeightProperty: 'weight',
        writeRelationshipType: 'HyperEdge',
        writeNodeIds: true})
        YIELD relationshipsWritten
        RETURN relationshipsWritten",
        {batchMode: 'SINGLE', parallel: false});`);      
        tx
        .run(`CALL gds.graph.project(
          'myEdgeGraph',
          'UTILISATEUR',
          'HyperEdge',
          {relationshipProperties: 'totalCost'});`);
        tx
        .run(`CALL apoc.periodic.iterate(
          "MATCH (s:UTILISATEUR) RETURN s",
          "CALL gds.allShortestPaths.hyper.write('myEdgeGraph', {
          searchDeph : 2,
          sourceNode: s,
          relationshipWeightProperty: 'totalCost',
          writeRelationshipType: 'HyperPath',
          writeNodeIds: true})
          YIELD relationshipsWritten
          RETURN relationshipsWritten",
          {batchMode: 'SINGLE', parallel: false});`);
        tx
        .run(`CALL gds.graph.project(
          'myHyperGraph',
          'UTILISATEUR',
          {
            HyperPath: {
              orientation: 'NATURAL',
              properties: ['totalCost']
            }});`);
          tx
          .run(`CALL gds.louvain.write('myHyperGraph', { writeProperty: 'Hypercommunity' })
          YIELD 
          communityCount, modularity, modularities;`);
          tx
          .run(`MATCH ()-[r:HyperEdge]->()
          DELETE r;`);
          tx
          .run(`MATCH ()-[r:HyperPath]->()
          DELETE r;`); 
          tx
          .run(`CALL gds.graph.drop('myGraph') YIELD graphName;`);
          tx
          .run(`CALL gds.graph.drop('myEdgeGraph') YIELD graphName;`);
          tx
          .run(`CALL gds.graph.drop('myHyperGraph') YIELD graphName;`);
        tx.commit();
    
    }


}
mongoose
  .connect(db,{ useNewUrlParser: true ,useUnifiedTopology: true ,useFindAndModify: false})
  .then(() => {
    console.log('dev mode plz uncomment this section')
    rebuildcommunities();
    // fetchNews(mecaurls,MecaCollection,mecaImg);
    // fetchNews(infourls,InfoCollection,infoImg);
    // fetchNews(elctrourls,ElectroCollection,electroImg);
  
  app.listen(5000);
  console.log("server running on 5000");
  })
  .catch(err => {
    console.log(err);
  });


