import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';

function handleType(dispatch) {
  return (event) => {
    event.preventDefault();
    actions.filterByName(dispatch, event.currentTarget.value);
  }
}

function Search(props) {
  return (
    <label>
      Filter the Pokemons:
      <div className="input-group">
        <input className="form-control" type="text" placeholder="Type..." name="pokemon" onChange={handleType(props.dispatch)}/>
        <div className="input-group-btn">
          <button className="btn btn-default" type="button">Filter</button>
        </div>
      </div>
    </label>
  )
}

export default connect(null)(Search);
