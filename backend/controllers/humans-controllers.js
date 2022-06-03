const HttpError = require('../models/http-error');
const neo4j = require ('neo4j-driver');
const REACT_APP_NEO4J_URI = require('../config/keys').NEO4J_URI;
const REACT_APP_NEO4J_USER = require('../config/keys').NEO4J_USER;
const REACT_APP_NEO4J_PASSWORD = require('../config/keys').NEO4J_PASSWORD;


const fetchallInfo = (callback) => {

  let humains =[];

  const FETCH_USER_QUERY = `
  MATCH (u:UTILISATEUR)
  RETURN u;
  `;

  const driver = neo4j.driver(
    REACT_APP_NEO4J_URI,
    neo4j.auth.basic(
        REACT_APP_NEO4J_USER,
        REACT_APP_NEO4J_PASSWORD
    )
  )
  console.log("CALLING FETCH USER");
  const session = driver.session();
  session
    .run(FETCH_USER_QUERY)
    .then(result => {
      result.records.map(user => {
        f=user.toObject({ getters: true });
        h=f.u.properties;
        humains = [...humains, h];}
    )
      return callback(humains);
    })
    .catch(e => {
      console.log(e);
    })
    .finally(() => {
      session.close();
    });
};

const activateUser = (mail,callback) => {

  let apdated =[];

  const ACTIVATE_USER_QUERY = `
  MATCH (u:UTILISATEUR {email: $Email})
  SET u.isActive = true
  RETURN u;`;

  const driver = neo4j.driver(
    REACT_APP_NEO4J_URI,
    neo4j.auth.basic(
        REACT_APP_NEO4J_USER,
        REACT_APP_NEO4J_PASSWORD
    )
  )
  console.log("CALLING activate USER");
  const session = driver.session();
  session
    .run(ACTIVATE_USER_QUERY,{Email:mail})
    .then(result => {
      result.records.map(user => {
        f=user.toObject({ getters: true });
        h=f.u.properties;
        apdated = [...apdated, h];}
    )
      return callback(apdated);
    })
    .catch(e => {
      console.log(e);
    })
    .finally(() => {
      session.close();
    });
};

const rejectUser = (mail,callback) => {

  let apdated =[];

  const REJECT_USER_QUERY = `
  MATCH (u:UTILISATEUR {email: $Email})
  SET u.isActive = false
  RETURN u;`;

  const driver = neo4j.driver(
    REACT_APP_NEO4J_URI,
    neo4j.auth.basic(
        REACT_APP_NEO4J_USER,
        REACT_APP_NEO4J_PASSWORD
    )
  )
  console.log("CALLING reject USER");
  const session = driver.session();
  session
    .run(REJECT_USER_QUERY,{Email:mail})
    .then(result => {
      result.records.map(user => {
        f=user.toObject({ getters: true });
        h=f.u.properties;
        apdated = [...apdated, h];}
    )
      return callback(apdated);
    })
    .catch(e => {
      console.log(e);
    })
    .finally(() => {
      session.close();
    });
};

const removeUser = (mail,callback) => {

  let success;

  const REMOVE_USER_QUERY = `
  MATCH (u:UTILISATEUR {email: $Email})
  DETACH DELETE u;`;

  const driver = neo4j.driver(
    REACT_APP_NEO4J_URI,
    neo4j.auth.basic(
        REACT_APP_NEO4J_USER,
        REACT_APP_NEO4J_PASSWORD
    )
  )
  console.log("CALLING remove USER");
  const session = driver.session();
  session
    .run(REMOVE_USER_QUERY,{Email:mail})
    .then(result => {
      success=result.summary.updateStatistics._stats.nodesDeleted
      return callback(success);
    })
    .catch(e => {
      console.log(e);
    })
    .finally(() => {
      session.close();
    });
};


const findall = async (req, res, next) => {
  
  try {
   fetchallInfo((users)=>{ 

    if (!users || users.length === 0 ) {
      return next(
        new HttpError('there is no users in database', 404)
      );
    }

    res.json({ assets: users});
});
  } catch (err) {
    const error = new HttpError(
      'Fetching humans assets failed, please try again later.',
      500
    );
    return next(error);
  }
};

const activate = async (req, res, next) => {
  
  const filter = req.body.email;

  try {
    activateUser(filter,(users)=>{ 
 
     if (!users || users.length === 0 ) {
       return next(
         new HttpError('update fail plz try again later', 404)
       );
     }
 
     res.json('apdate operation succes !');
 });
   } catch (err) {
     const error = new HttpError(
       'data base server is down plz try later',
       500
     );
     return next(error);
   }
};

const reject = async (req, res, next) => {
  
  const filter = req.body.email;

  try {
    rejectUser(filter,(users)=>{ 
 
     if (!users || users.length === 0 ) {
       return next(
         new HttpError('update fail plz try again later', 404)
       );
     }
 
     res.json('apdate operation succes !');
 });
   } catch (err) {
     const error = new HttpError(
       'data base server is down plz try later',
       500
     );
     return next(error);
   }
};

const erase = async (req, res, next) => {
  
  const filter = req.body.email;

  try {
    removeUser(filter,(done)=>{ 
     if (!done) {
       return next(
         new HttpError('delete fail plz try again later', 404)
       );
     }
     res.json('delete operation succes !');
 });
   } catch (err) {
     const error = new HttpError(
       'data base server is down plz try later',
       500
     );
     return next(error);
   }
};

exports.findall = findall;
exports.activate = activate;
exports.reject = reject;
exports.erase = erase;