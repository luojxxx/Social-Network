var express = require('express');
var router = express.Router();

var Pokemon = require('../models/pokemon');

router.get('/', function(req, res, next) {
  Pokemon.find()
  .then((allPokemon)=>{
    res.json(allPokemon)
  });
});

router.post('/', function(req, res, next) {
  var newPokemon = req.body;
  Pokemon.create(newPokemon)
  .then(()=>{
    res.send('Added new');
  })
  .catch((err)=>{
    res.send(err);
  })
});

router.put('/:_id', function(req, res, next) {
  var id = req.params._id;
  var updatedPokemon = req.body;

  var query = {_id: id};
  var update = {
    name: updatedPokemon.name,
    type: updatedPokemon.type
  }
  Pokemon.findOneAndUpdate(query, update, {})
  .then(()=>{
    res.send('Update complete');
  })
  .catch((err)=>{
    res.send(err);
  })
});

router.delete('/:_id', function(req, res, next) {
  var id = req.params._id;

  var query = {_id: id};
  Pokemon.remove(query)
  .then(()=>{
    res.send('Delete complete');
  })
  .catch((err)=>{
    res.send(err);
  });
});

module.exports = router;