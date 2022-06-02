const mongoose = require('mongoose');
const neo4j = require ('neo4j-driver');
const infoUrls = require('./config/urls');
// DB Config
const db = require('./config/keys').mongoURI;
const REACT_APP_NEO4J_URI = require('./config/keys').NEO4J_URI;
const REACT_APP_NEO4J_USER = require('./config/keys').NEO4J_USER;
const REACT_APP_NEO4J_PASSWORD = require('./config/keys').NEO4J_PASSWORD;

const FETCH_USER_INFO_QUERY = `
MATCH (u:UTILISATEUR {CIN: $userId})
RETURN u.nom AS user;
`;

// Connect to MongoDB
mongoose
  .connect(db,{ useNewUrlParser: true ,useUnifiedTopology: true})
  .then(() => {console.log('MongoDB Connected');
              fetchUserInfo(17332134);
        })
  .catch(err => console.log(err));

const driver = neo4j.driver(
    REACT_APP_NEO4J_URI,
    neo4j.auth.basic(
        REACT_APP_NEO4J_USER,
        REACT_APP_NEO4J_PASSWORD
    )
)

const fetchUserInfo = (user) => {
    console.log("CALLING FETCH USER");
    console.log(user);
    const session = driver.session();
    session
      .run(FETCH_USER_INFO_QUERY, {
        userId: user    //this.props.selectedUser
      })
      .then(result => {
        console.log(result);
        const record = result.records[0];
        const userInfo = record.get("user");
        console.log(userInfo);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        session.close();
      });
  };