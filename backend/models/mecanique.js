const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MecaSchema = new Schema({
  title: {
    type: Schema.Types.Mixed,
    required: true
  },
  description: {
    type: Schema.Types.Mixed
   
  },
  link: {
    type: Schema.Types.Mixed,
    required: true
  },
  imagesrc: {
    type: Schema.Types.Mixed,
    default:'http://localhost:5000/models/img/mecanique.jpg'
  },
  pubDate: {
    type: Schema.Types.Mixed
  },
  views: {
    type: Schema.Types.Mixed,
    default: 0

  },
  comments: {
    type: Schema.Types.Mixed,
    default: 0

  }},{strict: false});

module.exports = MecaCollection = mongoose.model('mecas', MecaSchema);