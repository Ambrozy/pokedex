import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import pokemonApp from './reducers';
import actions from './actions';

const store = createStore(pokemonApp);
actions.loadPokemons([], store.dispatch, store.getState().get('limit'), store.getState().get('offset'));
actions.loadPokemonAmount(store.dispatch);
actions.loadTags(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);
