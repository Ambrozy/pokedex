import React from 'react';
import { connect } from 'react-redux';
import isString from 'lodash/isString';
import get from 'lodash/get';

function mapStateToProps(state) {
  return {
    pokemons: state.get('pokemons').slice(state.get('offset'), state.get('offset') + state.get('limit')),
    input: state.get('input'),
    activeTag: state.get('activeTag'),
  }
}

function filterPokemons(item, input, activeTag) {
  const inputOK = !isString(item.name) || item.name.indexOf(input || '') !== -1;
  const tagsOK = !activeTag || item.types.findIndex((item) => item.type.name === activeTag) !== -1;
  return inputOK && tagsOK;
}

function PokemonTable(props) {
  const filteredPokemons = props.pokemons.filter((item) =>
    filterPokemons(item, props.input, props.activeTag)
  );
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Base experience</th>
          <th scope="col">Height</th>
          <th scope="col">Weight</th>
          <th scope="col">Order</th>
          <th scope="col">Types</th>
        </tr>
      </thead>
      <tbody>
        {
          filteredPokemons.map((pokemon) => (
            <tr key={pokemon.id}>
              <th scope="row">{pokemon.id}</th>
              <td><img src={get(pokemon, 'sprites.front_default')} alt={pokemon.name} height="64" crossOrigin="anonymous"/></td>
              <td>{pokemon.name}</td>
              <td>{pokemon.base_experience}</td>
              <td>{pokemon.height}</td>
              <td>{pokemon.weight}</td>
              <td>{pokemon.order}</td>
              <td>{
                (pokemon.types || []).map(
                  (item, index) =>
                    <div className="pokemon-type" key={index}>{item.type.name}</div>
                )
              }</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default connect(mapStateToProps)(PokemonTable);
