var mongoose = require('mongoose');

// Pokemon Schema
var pokemonSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String, 
    required: true
  }
});

var Pokemon = module.exports = mongoose.model('pokemon', pokemonSchema);