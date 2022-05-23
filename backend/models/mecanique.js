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
  pubDate: {
    type: Schema.Types.Mixed
  }

  
},{strict: false});

module.exports = MecaSchema = mongoose.model('mecas', MecaSchema);