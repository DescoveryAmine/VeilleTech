const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const neo4j = require ('neo4j-driver');
const REACT_APP_NEO4J_URI = require('../config/keys').NEO4J_URI;
const REACT_APP_NEO4J_USER = require('../config/keys').NEO4J_USER;
const REACT_APP_NEO4J_PASSWORD = require('../config/keys').NEO4J_PASSWORD;

const HttpError = require('../models/http-error');



const fetchUserbyId = (userid,callback) => {

  let users =[];

  const FETCH_USER_QUERY = `
  MATCH (u:UTILISATEUR {userId: $Id})
  RETURN u;`;

  const driver = neo4j.driver(
    REACT_APP_NEO4J_URI,
    neo4j.auth.basic(
        REACT_APP_NEO4J_USER,
        REACT_APP_NEO4J_PASSWORD
    )
  )
  console.log("CALLING fetch USER by Id");
  const session = driver.session();
  session
    .run(FETCH_USER_QUERY,{Id : userid})
    .then(result => {
      result.records.map(user => {
        f=user.toObject({ getters: true });
        h=f.u.properties;
        users = [...users, h];}
    )
      return callback(users);
    })
    .catch(e => {
      console.log(e);
      return callback([]);
    })
    .finally(() => {
      session.close();
    });
};

const fetchUserbyEmail = (mail,callback) => {

  let users =[];

  const FETCH_USER_QUERY = `
  MATCH (u:UTILISATEUR {email: $Email})
  RETURN u;`;

  const driver = neo4j.driver(
    REACT_APP_NEO4J_URI,
    neo4j.auth.basic(
        REACT_APP_NEO4J_USER,
        REACT_APP_NEO4J_PASSWORD
    )
  )
  console.log("CALLING fetch USER by email");
  const session = driver.session();
  session
    .run(FETCH_USER_QUERY,{Email : mail})
    .then(result => {
      result.records.map(user => {
        f=user.toObject({ getters: true });
        h=f.u.properties;
        users = [...users, h];}
    )
      return callback(users);
    })
    .catch(e => {
      console.log(e);
      return callback([]);
    })
    .finally(() => {
      session.close();
    });
};

const fetchUserInterrest = (comid,callback) => {

  const INTERREST_USER_QUERY = `
    CALL gds.graph.project.cypher(
    'UserOfSameCommunity',
    'MATCH (n) WHERE (n:UTILISATEUR AND n.Hypercommunity=${comid}) OR n:Domain RETURN id(n) AS id, labels(n) AS labels',
    'MATCH (n{Hypercommunity:${comid}})-[r:Link]->(m) RETURN id(n) AS source, id(m) AS target, type(r) AS type')
    YIELD
    graphName AS graph, nodeQuery, nodeCount AS nodes, relationshipCount AS rels;`;

    const REMOVE_INTERREST_GRAPH_QUERY = `
    CALL gds.graph.drop('UserOfSameCommunity') YIELD graphName;`;

  const driver = neo4j.driver(
    REACT_APP_NEO4J_URI,
    neo4j.auth.basic(
        REACT_APP_NEO4J_USER,
        REACT_APP_NEO4J_PASSWORD
    )
  )
  console.log("CALLING find inetrrest USER");
  const session = driver.session();
  const tx = session.beginTransaction();
      tx
      .run(INTERREST_USER_QUERY)
      tx
        .run(`CALL gds.degree.stream(
          'UserOfSameCommunity',
          { orientation: 'REVERSE' })
          YIELD nodeId, score
          RETURN gds.util.asNode(nodeId).title AS Title
          order by score desc limit 1;`)
      // tx.commit()
     .then(result => {
      const record = result.records[0];
      const ftitle = record.get("Title");
      return callback(ftitle);
    })
    .then(      
      tx
      .run(REMOVE_INTERREST_GRAPH_QUERY)
      )
    .catch(e => {
      console.log(e);
      return callback([]);
    })
    .finally(() => {
      session.close();
    });
};

const saveUser = (name, lastname, numcin,email,age, password,callback) => {

  let users =[];

  const SAVE_USER_QUERY = `
  CREATE (u:UTILISATEUR {userId:apoc.create.uuid(),name:$Name, lastname:$Lastname,numcin:$Numcin,email: $Email, age:$Age, password:$Password, isActive:false,com:'0',subId:'000000', Pinfo:'5',Pelectro:'5', Pmeca:'5', Role:'client'})
  RETURN u;`;

  const driver = neo4j.driver(
    REACT_APP_NEO4J_URI,
    neo4j.auth.basic(
        REACT_APP_NEO4J_USER,
        REACT_APP_NEO4J_PASSWORD
    )
  )
  console.log("CALLING register USER");
  const session = driver.session();
  session
    .run(SAVE_USER_QUERY,{Name:name, Lastname:lastname,Numcin:numcin,Email: email, Age:age, Password:password})
    .then(result => {
      result.records.map(user => {
        f=user.toObject({ getters: true });
        h=f.u.properties;
        users = [...users, h];}
    )
      return callback(users);
    })
    .catch(e => {
      console.log(e);
      return callback([]);
    })
    .finally(() => {
      session.close();
    });
};

const updateUser = (userid, info, electro,meca, lastPolarities, callback) => {

  
  function sigmoid(x) {
    let alpha = 0.2;
    return 1 / (1 + Math.exp(-x*alpha));
   }

   function Invsigmoid(z) {
    let betha = 5;
    let x;
    {z>0?x=z:x=0.1}
    return betha*(Math.log(z/(1 - z)));
   }

   function weight(last,recent,med) {

    let lastPs= Invsigmoid(last/10);
    let polarity;
    {recent>0 ? polarity=10*sigmoid(lastPs+recent-med):polarity=10*sigmoid(lastPs)};
    return parseInt(polarity);
   }

   function dev(arr){

    let mean = arr.reduce((acc, curr)=>{
      return acc + curr
    }, 0) / arr.length;
     
    arr = arr.map((k)=>{
      return (k - mean) ** 2
    })

   let sum = arr.reduce((acc, curr)=> acc + curr, 0);
   //return Math.sqrt(sum / arr.length)
   return mean;
  }
  let users =[];
  let updates = [info,electro,meca];
  let deviation= dev(updates);
  let infoWeight=weight(lastPolarities[0],info,deviation);
  let electroWeight=(weight(lastPolarities[1],electro,deviation));
  let mecaWeight=(weight(lastPolarities[2],meca,deviation));


  const UPDATE_USER_QUERY = `
  match (u:UTILISATEUR{userId:$UserId}) 
  match (di:Domain{title:'informatique'})
  match (de:Domain{title:'electronique'})
  match (dm:Domain{title:'mecanique'})
  SET u.Pinfo=toString($InfoWeight)
  SET u.Pelectro=toString($ElectroWeight) 
  SET u.Pmeca=toString($MecaWeight)
  MERGE (u)-[ri:Link]->(di) SET ri.weight=10*$InfoWeight+5
  MERGE (u)-[re:Link]->(de) SET re.weight=10*$ElectroWeight+5
  MERGE (u)-[rm:Link]->(dm) SET rm.weight=10*$MecaWeight+5 ;`;


  const driver = neo4j.driver(
    REACT_APP_NEO4J_URI,
    neo4j.auth.basic(
        REACT_APP_NEO4J_USER,
        REACT_APP_NEO4J_PASSWORD
    )
  )
  console.log("CALLING Update USER");
  const session = driver.session();
  session
    .run(UPDATE_USER_QUERY,{UserId:userid, InfoWeight:infoWeight,ElectroWeight:electroWeight,MecaWeight: mecaWeight})
    .then(result => {
      result.records.map(user => {
        f=user.toObject({ getters: true });
        h=f.u.properties;
        users = [...users, h];}
    )
      return callback(users);
    })
    .catch(e => {
      console.log(e);
      return callback([]);
    })
    .finally(() => {
      session.close();
    });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { name, lastname, numcin, age, email, password } = req.body;

  const filter = email;

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not apply security, please try again.',
      500
    );
    return next(error);
  }


  try {
    fetchUserbyEmail(filter,(users)=>{ 
      const user=users.shift();
     if (user) {
       return next(
         new HttpError('regtration fail plz try another email', 404)
       );
     }
     else{

      try {
        saveUser(name, lastname, numcin, email, age, hashedPassword,(users)=>{ 
         if (users || users.length > 0 ) {
          res.json('you have been succesfully regstred and waitting for activataion');
         }
       });
       } catch (err) {
         const error = new HttpError(
           'data base server is down plz try later',
           500
         );
         return next(error);
       }
     }
 });
   } catch (err) {
     const error = new HttpError(
       'data base server is down plz try later',
       500
     );
     return next(error);
   }

};

const login = async (req, res, next) => {

  const { email, password } = req.body;

  const filter = email;

  try {
    fetchUserbyEmail(filter,(users)=>{ 
      const user=users.shift();
     if (user) {

      let isValidPassword = false;
      try {
        isValidPassword = bcrypt.compare(password, user.password);
      } catch (err) {
        const error = new HttpError(
          'Could not apply security credentional, please check your credentials and try again.',
          500
        );
        return next(error);
      }
    
      if (!isValidPassword) {
        const error = new HttpError(
          'Invalid credentials, could not log you in.',
          403
        );
        return next(error);
      }
    
      if (!user.isActive) {
        const error = new HttpError(
          'still await for admin activation',
          410
        );
        return next(error);
      }
    
      else{

        if (user.subId==='003100') {
        try{
          const filter = user.Hypercommunity; 
          fetchUserInterrest(filter,(fInt)=>{
            let token;
            try {
              token = jwt.sign(
                { userName: user.name, userRole: user.role},
                'supersecret_dont_share',
                { expiresIn: '30m' }
              );
            } catch (err) {
              const error = new HttpError(
                'Logging in failed, please try again later.',
                500
              );
              return next(error);
            }
            res.json({
              message: 'Logged in!',
              userId: user.userId,
              userName: user.name,
              userRole: user.role,
              userInterrest: fInt,
              email: user.email,
              token: token
            });   
            
          })
        }
       catch (err) {
        const error = new HttpError(
          'data base server is down plz try later',
          500
        );
        return next(error);
      }
    }
    else {
      let token;
      try {
        token = jwt.sign(
          {userName: user.name, userRole: user.role},
          'supersecret_dont_share',
          { expiresIn: '30m' }
        );
      } catch (err) {
        const error = new HttpError(
          'Logging in failed, please try again later.',
          500
        );
        return next(error);
      }
      res.json({
        message: 'Logged in!',
        userId: user.userId,
        userName: user.name,
        userRole: user.role,
        userInterrest: 'Natural',
        email: user.email,
        token: token
      });   

    }
      }
     }
     
     else{
      const error = new HttpError(
        'Invalid credentials, could not log you in.',
        401
      );
      return next(error);
     }
 });
   } catch (err) {
     const error = new HttpError(
       'data base server is down plz try later',
       500
     );
     return next(error);
   }

};
const logout = async (req, res, next) => {

  const { userID, Info, Electro, Meca } = req.body;

  const filter = userID;

  try {
    fetchUserbyId(filter,(users)=>{ 
      const user=users.shift();
     if (user && user.subId==='003100') {

        try {
         const lastUpdates = [parseInt(user.Pinfo),parseInt(user.Pelectro),parseInt(user.Pmeca)];
         updateUser(filter, parseInt(Info), parseInt(Electro), parseInt(Meca), lastUpdates,(users)=>{ 
          if (users || users.length > 0 ) {
           res.json('youe session have been succesfully updates');
          }
        });

        } catch (err) {
          const error = new HttpError(
            'updating session failed, we will updating that later.',
            500
          );
          return next(error);
        }
     }
     else{
      const error = new HttpError(
        'Invalid user credentials, we could not update such session',
        401
      );
      return next(error);
     }
 });
   } catch (err) {
     const error = new HttpError(
       'data base server is down plz try later',
       500
     );
     return next(error);
   }

};
exports.signup = signup;
exports.login = login;
exports.logout = logout;
