const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Infos = require('../models/informatique');


const getArticlesByDate = async (req, res, next) => {
  
  let ts = Date.now();

  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();

  const Now = year + "-" + month + "-" + date;

  // let articles;
  let RecentArticles;
  try {
    RecentArticles = await Infos.find({});
  } catch (err) {
    const error = new HttpError(
      'Fetching articles failed, please try again later.',
      500
    );
    return next(error);
  }

  // if (!places || places.length === 0) {
  if (!RecentArticles || RecentArticles.length === 0) {
    return next(
      new HttpError('Could not find articles', 404)
    );
  }

  res.json({ articles: RecentArticles.map(article => {
    let   doc=article.toObject({ getters: true });
    const ar={cat : 'info',...doc};
    return(ar);}
  )});
};

const getArticlesByUserId = async (req, res, next) => {

  const userId = req.params.uid;

  // let places;
  let userWithPlaces;
  try {
    userWithPlaces = await User.findById(userId).populate('places');
  } catch (err) {
    const error = new HttpError(
      'Fetching places failed, please try again later.',
      500
    );
    return next(error);
  }

  // if (!places || places.length === 0) {
  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    return next(
      new HttpError('Could not find places for the provided user id.', 404)
    );
  }

  res.json({ places: userWithPlaces.places.map(place => place.toObject({ getters: true })) });
};

exports.getArticlesByDate = getArticlesByDate;
exports.getArticlesByUserId = getArticlesByUserId;

