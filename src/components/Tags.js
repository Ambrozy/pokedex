import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import actions from '../actions';

function mapStateToProps(state) {
  return {
    tags: state.get('tags'),
    activeTag: state.get('activeTag'),
  }
}

function handleClick(dispatch, tag_name) {
  return (event) => {
    event.preventDefault();
    actions.filterByTag(dispatch, tag_name);
  }
}

function Tags(props) {
  return (
    <div className="tags-row">
      {
        props.tags.map((item, index) => (
          <button className={cx("btn btn-default", {"active": item === props.activeTag})}
                  onClick={handleClick(props.dispatch, item === props.activeTag ? null : item)}
                  type="button"
                  key={index}>
            {item}
          </button>
        ))
      }
    </div>
  )
}

export default connect(mapStateToProps)(Tags);
