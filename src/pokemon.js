var Promise = require('bluebird'),
    request = require('request');
    URL = require('url')

// your code here

requestPromise = function(url){
  return new Promise(function(resolve, reject){
    request(url, function(error, res, body){
      if (error) { reject(error)}
      return resolve(JSON.parse(body))
    })
  })
}

var PokemonAPI = function() {
  this.errors = {
    noPokemonPassed: 'A Pokemon is required to use this method!'
  }
}

PokemonAPI.prototype.done = function(cb) {
  if (cb) {
    return this.promise.then(cb)
  }
  return this.promise
}

PokemonAPI.prototype.pokemon = function(pokemon) {
  if (!pokemon) {
    this.promise = new Promise.reject(this.errors.noPokemonPassed)
  }
  else {
    var str = (typeof pokemon) === 'string' ? pokemon.toLowerCase() : pokemon;
    var url = `http://pokeapi.co/api/v2/pokemon/${str}`
    this.promise = requestPromise(url)
    .then(function(pokemon) {
      return pokemon
    })
  }
  return this
}

PokemonAPI.prototype.abilities = function(input) {
  if (!this.promise) {
    this.promise = new Promise.reject(this.errors.noPokemonPassed)
    return this
  }
  this.promise = this.promise.then(function(pokemon){
    var abilities = pokemon.abilities

    if (input) {
      abilities = abilities.filter(function(obj){
        return obj.ability.name.toLowerCase() === input.toLowerCase()
      })
    }

    if ( !abilities[0] ) { return Promise.resolve({}); }

    promises = abilities.map(function(obj){
      var url = URL.parse(obj.ability.url).href
      return requestPromise(url)
    });

    return input ? Promise.resolve(promises[0]) : Promise.all(promises);
  })

  return this
}

module.exports = {
  api: PokemonAPI
}
