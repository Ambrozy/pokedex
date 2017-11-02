import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import actions from '../actions';

function mapStateToProps(state) {
  return {
    pokemons: state.get('pokemons'),
    pokemonAmount: state.get('pokemonAmount'),
    limit: state.get('limit'),
    offset: state.get('offset'),
  }
}

function prevPage({ pokemons, dispatch, limit, offset }) {
  return (event) => {
    event.preventDefault();
    actions.prevPage(dispatch);
    actions.loadPokemons(pokemons, dispatch, limit, offset - limit);
  }
}
function nextPage({ pokemons, dispatch, limit, offset }) {
  return (event) => {
    event.preventDefault();
    actions.nextPage(dispatch);
    actions.loadPokemons(pokemons, dispatch, limit, offset + limit);
  }
}
function changePage({ pokemons, dispatch, limit }, offset) {
  return (event) => {
    event.preventDefault();
    actions.changePage(dispatch, offset);
    actions.loadPokemons(pokemons, dispatch, limit, offset);
  }
}
function changeLimit({ pokemons, dispatch, offset }, limit) {
  return (event) => {
    event.preventDefault();
    actions.changeLimit(dispatch, limit);
    actions.loadPokemons(pokemons, dispatch, limit, offset);
  }
}

function Paginator(props) {
  const btns = [],
        currentPage = props.offset > 0 && props.offset < props.limit ? 2 : Math.floor(props.offset / props.limit) + 1;

  if (props.offset > 0) {
    btns.push(<li key="prev"><a href="#" title="Previous page" onClick={prevPage(props)}>←</a></li>);
  }
  for (let i = currentPage - 3; i <= currentPage + 3 && (i - 1) * props.limit < props.pokemonAmount; i++)  {
    if (i > 0) {
      btns.push(<li className={cx({"active": i === currentPage})} key={i}>
        <a href="#" title={`Page ${i}`} onClick={changePage(props, (i - 1) * props.limit)}>{i}</a>
      </li>);
    }
  }
  if (props.offset + props.limit < props.pokemonAmount) {
    btns.push(<li key="next"><a href="#" title="Next page" onClick={nextPage(props)}>→</a></li>);
  }
  return (
    <div className="pagination-box">
      <ul className="pagination">
        {btns}
      </ul>
      <ul className="pagination">
        <li className={cx({"active": props.limit === 20})}>
          <a href="#" title="20 pokemons per page" onClick={changeLimit(props, 20)}>20</a>
        </li>
        <li className={cx({"active": props.limit === 50})}>
          <a href="#" title="50 pokemons per page" onClick={changeLimit(props, 50)}>50</a>
        </li>
        <li className={cx({"active": props.limit === 100})}>
          <a href="#" title="100 pokemons per page" onClick={changeLimit(props, 100)}>100</a>
        </li>
      </ul>
    </div>
  )
}

export default connect(mapStateToProps)(Paginator);
