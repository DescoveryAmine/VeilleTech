
const HttpError = require('../models/http-error');
const Infos = require('../models/informatique');
const Electro = require('../models/electronique');
const Meca = require('../models/mecanique');


const getArticles = async (req, res, next) => {
  

  // let infoarticles;
  let InfoArticles;
  // let electroarticles;
  let ElectroArticles;
  // let mecaarticles;
  let MecaArticles;
  // let articles;
  let RecentArticles =[];
  try {
    InfoArticles = await Infos.find({});
  } catch (err) {
    const error = new HttpError(
      'Fetching some articles failed, please try again later.',
      500
    );
    return next(error);
  }

  try {
    ElectroArticles = await Electro.find({});
  } catch (err) {
    const error = new HttpError(
      'Fetching some articles failed, please try again later.',
      500
    );
    return next(error);
  }

  try {
    MecaArticles = await Meca.find({});
  } catch (err) {
    const error = new HttpError(
      'Fetching some articles failed, please try again later.',
      500
    );
    return next(error);
  }

  // if (!places || places.length === 0) {
  if (!InfoArticles || InfoArticles.length === 0 && !ElectroArticles || ElectroArticles.length && !MecaArticles || MecaArticles.length === 0 ) {
    return next(
      new HttpError('Could not find articles', 404)
    );
  }

   if (InfoArticles.length>0)
    {InfoArticles.map(article => {
    let   doc=article.toObject({ getters: true });
    const ar={cat : 'informatique',...doc};
    RecentArticles = [...RecentArticles, ar]}
  )}

  if (ElectroArticles.length>0)
  {ElectroArticles.map(article => {
  let   doc=article.toObject({ getters: true });
  const ar={cat : 'electronique',...doc};
  RecentArticles = [...RecentArticles, ar]}
  )}

  if (MecaArticles.length>0)
  {MecaArticles.map(article => {
  let   doc=article.toObject({ getters: true });
  const ar={cat : 'mecanique',...doc};
  RecentArticles = [...RecentArticles, ar]}
  )}

  res.json({ articles: RecentArticles});
};

const updateArticlesById = async (req, res, next) => {

  const {postId, postCat} = req.body;
  
  let schema;

  switch (postCat) {
    case 'informatique':
      schema=Infos;
      break;
    case 'electronique':
      schema=Electro;
      break;
    case 'mecanique':
      schema=Meca;
      break;
    default:
      console.log(`Sorry, we are out of range`);
  }
  const filter = { _id: postId };
  const update = { $inc: { views: 1 }};
  try {
    apdated = await schema.findOneAndUpdate(filter, update, {
      new: true
    });
  } catch (err) {
    const error = new HttpError(
      'Fetching some articles failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!apdated || apdated.length===0) {
    return next(
      new HttpError('Could not apdate articles', 404)
    );
  }
  res.json('apdate ok!');
}

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

exports.getArticles = getArticles;
exports.getArticlesByUserId = getArticlesByUserId;
exports.updateArticlesById = updateArticlesById;

