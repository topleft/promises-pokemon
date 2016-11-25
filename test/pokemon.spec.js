var chai              = require('chai'),
    chaiAsPromised    = require('chai-as-promised'),
    should            = chai.should(),
    expectedResponses = require('./expected/responses'),
    PokemonAPI        = require('../src/pokemon').api,
    Promise           = require('bluebird')
    // Replay            = require('Replay');
chai.use(chaiAsPromised);

// Replay.fixtures = './test/fixtures';

function res (result) {
  return result;
}

describe('PokemonAPI', function () {
  var api;

  beforeEach(function () {
    api = new PokemonAPI();
  });

  describe('.pokemon()', function () {
    it('throws an error if there is no parameter', function () {
      var expected = 'A Pokemon is required to use this method!';
      return api.pokemon().done().should.be.rejectedWith(expected);
    });

    it('returns an object with the pokemon by name', function () {
      var expected = expectedResponses.pokemon;
      return api.pokemon('pikachu').done().should.eventually.deep.equal(expected);
    });

    xit('returns an object with the pokemon by number', function () {
      var expected = expectedResponses.pokemon;
      return api.pokemon(25).done().should.eventually.deep.equal(expected);
    });

    xit('is case insensitive', function () {
      var expected = expectedResponses.pokemon;
      return api.pokemon('Pikachu').done().should.eventually.deep.equal(expected);
    });
  });

  xdescribe('.done()', function () {
    it('returns a promise if no callback is passed', function () {
      var pokePromise = api.pokemon('pikachu').done();
      (pokePromise.constructor).should.equal(Promise);
    });

    it('can take a callback function that operates on the returned promise\'s value', function () {
      var callback = function (result) { return 'Go, ' + result.name + '!'; }
      return api.pokemon('pikachu').done(callback).should.eventually.equal('Go, Pikachu!');
    });
  });

  xdescribe('.abilities()', function () {
    it('throws an error if there is no pokemon method chained before', function () {
        var expected = 'A Pokemon is required to use this method!';
        return api.abilities().done().should.be.rejectedWith(expected);
    });

    it('throws an error if there is no pokemon chained before', function () {
        var expected = 'A Pokemon is required to use this method!';
        return api.pokemon().abilities().done().should.be.rejectedWith(expected);
    });

    it('returns a fully realized array of abilities', function () {
      var expected = expectedResponses.abilities;
      return api.pokemon('Bulbasaur').abilities().done().should.eventually.deep.equal(expected);
    });

    it('returns a fully realized ability object if a parameter is passed', function () {
      var expected = expectedResponses.abilities[1];
      return api.pokemon('Bulbasaur').abilities('Overgrow').done().should.eventually.deep.equal(expected);
    });

    it('returns an empty object if the Pokemon doesn\'t have the ability inputted', function () {
      var expected = {};
      return api.pokemon('Bulbasaur').abilities('quick-feet').done().should.eventually.deep.equal(expected);
    });

    it('is case insensitive', function () {
      var expected = expectedResponses.abilities[1];
      return api.pokemon('Bulbasaur').abilities('overgrow').done().should.eventually.deep.equal(expected);
    });
  });
});
