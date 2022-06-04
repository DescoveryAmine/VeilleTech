const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const neo4j = require ('neo4j-driver');
const REACT_APP_NEO4J_URI = require('../config/keys').NEO4J_URI;
const REACT_APP_NEO4J_USER = require('../config/keys').NEO4J_USER;
const REACT_APP_NEO4J_PASSWORD = require('../config/keys').NEO4J_PASSWORD;

const HttpError = require('../models/http-error');
const User = require('../models/user');


const fetchUser = (mail,callback) => {

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
  console.log("CALLING fetch USER");
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

const saveUser = (name, lastname, numcin,email,age, password,callback) => {

  let users =[];

  const SAVE_USER_QUERY = `
  CREATE (u:UTILISATEUR {userId:apoc.create.uuid(),name:$Name, lastname:$Lastname,numcin:$Numcin,email: $Email, age:$Age, password:$Password, isActive:false})
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
    fetchUser(filter,(users)=>{ 
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
    fetchUser(filter,(users)=>{ 
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
        let token;
    
        try {
          token = jwt.sign(
            { userId: user.userId, userName: user.name, userRole: user.role, email: user.email },
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
          email: user.email,
          token: token
        });      
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

exports.signup = signup;
exports.login = login;
