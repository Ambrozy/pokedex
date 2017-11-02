import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { List } from 'immutable';
import pokemonApp from './reducers';
import actions from './actions';

const store = createStore(pokemonApp);
actions.loadTags(store.dispatch);
actions.loadPokemonAmount(store.dispatch);
actions.loadPokemons(List(), store.dispatch, store.getState().get('limit'), store.getState().get('offset'));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);
