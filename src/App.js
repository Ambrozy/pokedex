import React, { Component } from 'react';
import Search from './components/Search';
import Tags from './components/Tags';
import Paginator from './components/Paginator';
import PokemonTable from './components/PokemonTable';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Pokedex</h1>
        <hr/>
        <Search />
        <Tags />
        <Paginator />
        <PokemonTable />
        <Paginator />
      </div>
    );
  }
}

export default App;
