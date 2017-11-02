const isString = require('lodash/isString');
const isArray = require('lodash/isArray');
import { fromJS } from 'immutable';

const initialState = fromJS({
  limit: 20,
  offset: 0,
  pokemonAmount: 0,
  pokemons: [],
  tags: [],
});

const store = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER_BY_NAME':
      return state.set('input', isString(action.payload) ? action.payload : "");
    case 'FILTER_BY_TAG':
      return state.set('activeTag', isString(action.payload) ? action.payload : null);

    case 'POKEMON_AMOUNT_LOADED':
      return state.set('pokemonAmount', +action.payload || 0);
    case 'POKEMON_LOADED':
      const pokemons = state.get('pokemons').splice(action.payload.id, 0, action.payload);
      return state.set('pokemons', pokemons);
    case 'POKEMON_TYPES_LOADED':
      if (isArray(action.payload)) {
        return state.set('tags', action.payload);
      }
      return state;

    case 'NEXT_PAGE':
      return state.set('offset', state.get('offset') + state.get('limit'));
    case 'PREV_PAGE':
      let offset = state.get('offset') - state.get('limit');
      if (offset < 0) {
        offset = 0;
      }
      return state.set('offset', offset);
    case 'CHANGE_PAGE':
      return state.set('offset', +action.payload || 0);
    case 'CHANGE_LIMIT':
      return state.set('limit', +action.payload || 0);
    default:
      return state;
  }
}

export default store;
