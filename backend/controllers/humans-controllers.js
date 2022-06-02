const HttpError = require('../models/http-error');
const User = require('../models/user');

const findInactive = async (req, res, next) => {
  
  let humains =[];

  try {
    allusers = await User.find({});
  } catch (err) {
    const error = new HttpError(
      'Fetching humans assets failed, please try again later.',
      500
    );
    return next(error);
  }
  // if (!places || places.length === 0) {
  if (!allusers || allusers.length === 0 ) {
    return next(
      new HttpError('there is no inactive users', 404)
    );
  }

    {allusers.map(user => {
      user.toObject({ getters: true });
      humains = [...humains, user];}
  )}
  
  res.json({ assets: humains});
};

const activate = async (req, res, next) => {
  
  const filter = { email: req.body.email };
  const update = { isActive: true };

  try {
    newser = await User.findOneAndUpdate(filter, update, {
      new: true
    });
  } catch (err) {
    const error = new HttpError(
      'Fetching userID failed, please try again later.',
      500
    );
    return next(error);
  }
  // if (!places || places.length === 0) {
  if (!newser || newser.length === 0 ) {
    return next(
      new HttpError('there is no users with such Id', 404)
    );
  }

  res.json(newser.toObject({ getters: true }));
};

const reject = async (req, res, next) => {
  
  const filter = { email: req.body.email };
  const update = { isActive: false };

  try {
    newser = await User.findOneAndUpdate(filter, update, {
      new: true
    });
  } catch (err) {
    const error = new HttpError(
      'Fetching userID failed, please try again later.',
      500
    );
    return next(error);
  }
  // if (!places || places.length === 0) {
  if (!newser || newser.length === 0 ) {
    return next(
      new HttpError('there is no users with such Id', 404)
    );
  }

  res.json(newser.toObject({ getters: true }));
};

const erase = async (req, res, next) => {
  
  const filter = { email: req.body.email };

  try {
      await User.findOneAndRemove(filter, function (err, doc) {
      if (err){
        const error = new HttpError(
        err,500);
        return next(err);
      }
      else{
        res.json('deleting ok!');
      }
  });
  } catch (err) {
    
    res.json(err);
    
  }
 
};

exports.findInactive = findInactive;
exports.activate = activate;
exports.reject = reject;
exports.erase = erase;