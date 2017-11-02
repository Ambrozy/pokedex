import api from '../api';

function loadPokemonAmount(dispatch) {
  return api.getPokemonList()
    .then((json) => {
      dispatch({
        type: 'POKEMON_AMOUNT_LOADED',
        payload: json.count,
      });
    });
}
function loadPokemons(pokemons, dispatch, limit = 50, offset = 0) {
  let loadError = false;
  const handleError = () => { loadError = true };
  for (let i = 1; i <= limit && !loadError; i++) {
    if (pokemons[i + offset] === undefined) {
      loadPokemon(dispatch, i + offset)
        .catch(handleError);
    }
  }
}
function loadPokemon(dispatch, id) {
  return api.getPokemon(id)
    .then((json) => {
      dispatch({
        type: 'POKEMON_LOADED',
        payload: json,
      });
    });
}

function loadTags(dispatch) {
  return api.getPokemonTypeList()
    .then((json) => {
      dispatch({
        type: 'POKEMON_TYPES_LOADED',
        payload: json,
      });
    });
}

const actions = {
  filterByTag: (dispatch, tag_name) => dispatch({
    type: 'FILTER_BY_TAG',
    payload: tag_name,
  }),
  filterByName: (dispatch, input_value) => dispatch({
    type: 'FILTER_BY_NAME',
    payload: input_value,
  }),
  nextPage: (dispatch) => dispatch({
    type: 'NEXT_PAGE',
  }),
  prevPage: (dispatch) => dispatch({
    type: 'PREV_PAGE',
  }),
  changePage: (dispatch, offset) => dispatch({
    type: 'CHANGE_PAGE',
    payload: offset,
  }),
  changeLimit: (dispatch, limit) => dispatch({
    type: 'CHANGE_LIMIT',
    payload: limit,
  }),
  loadPokemonAmount,
  loadPokemons,
  loadTags,
}

export default actions;
