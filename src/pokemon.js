var Promise = require('bluebird'),
    request = require('request');

// your code here


var PokemonAPI = function() {
  this.errors = {
    noPokemonPassed: 'A Pokemon is required to use this method!'
  }
}

PokemonAPI.prototype.done = function() {
  return this.promise
}

PokemonAPI.prototype.pokemon = function(pokemon) {
  if (!pokemon) {
    this.promise = new Promise.reject(this.errors.noPokemonPassed)
  }
  else {
    var url = `http://pokeapi.co/api/v1/pokemon/${pokemon}`
    this.promise = new Promise(function(resolve, reject){
      request(url, function(error, res, body){
        if (error) { reject(error) }
        resolve(JSON.parse(body))
      })
    }).then(function(pokemon) {
      console.log(pokemon);
      return pokemon
    })
  }
  return this

}

module.exports = {
  api: PokemonAPI
}
