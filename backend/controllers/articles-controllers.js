
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
    const ar={cat : 'info',...doc};
    RecentArticles = [...RecentArticles, ar]}
  )}

  if (ElectroArticles.length>0)
  {ElectroArticles.map(article => {
  let   doc=article.toObject({ getters: true });
  const ar={cat : 'electro',...doc};
  RecentArticles = [...RecentArticles, ar]}
  )}

  if (MecaArticles.length>0)
  {MecaArticles.map(article => {
  let   doc=article.toObject({ getters: true });
  const ar={cat : 'meca',...doc};
  RecentArticles = [...RecentArticles, ar]}
  )}

  res.json({ articles: RecentArticles});
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

exports.getArticles = getArticles;
exports.getArticlesByUserId = getArticlesByUserId;

