import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';

function handleSubmit(dispatch) {
  return (event) => {
    event.preventDefault();
    actions.filterByName(dispatch, new FormData(event.currentTarget).get('pokemon'));
  }
}

function Search(props) {
  return (
    <form action="" onSubmit={handleSubmit(props.dispatch)}>
      <label>
        Filter the Pokemons:
        <div className="input-group">
          <input className="form-control" type="text" placeholder="Type..." name="pokemon"/>
          <div className="input-group-btn">
            <button className="btn btn-default">Filter</button>
          </div>
        </div>
      </label>
    </form>
  )
}

export default connect(null)(Search);
