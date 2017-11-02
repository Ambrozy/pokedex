const api = {
  getPokemon: (id) =>
    fetch(`http://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((resp) => resp.json()),
  getPokemonList: (limit = 20, offset = 0) =>
    fetch(`http://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
      .then((resp) => resp.json()),
  getPokemonTypeList: () =>
    fetch(`http://pokeapi.co/api/v2/type/`)
      .then((resp) => resp.json())
      .then((json) => json.results.map((item) => item.name)),
}
const api2 = {
  getPokemon: (id) =>
    new Promise(function(resolve, reject) {
      const pokemon = require('./pokemonDefault.json');
      pokemon.id = id;
      resolve(pokemon);
    }),
  getPokemonList: (limit = 20, offset = 0) =>
    new Promise(function(resolve, reject) {
      resolve(require('./pokemonListDefault.json'));
    }),
  getPokemonTypeList: () =>
    new Promise(function(resolve, reject) {
      resolve(require('./pokemonTypesDefault.json'));
    })
    .then((json) => json.results.map((item) => item.name)),
}

export default api;
