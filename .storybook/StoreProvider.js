// import React from 'react';
// import configureStore from '../app/store';
// import { browserHistory } from 'react-router';
// const store = configureStore({}, browserHistory);
import React from 'react'

import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
});

const store =
  (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(reducer)

const StoreProvider = React.createClass({
  propTypes: {
    children: React.PropTypes.any.isRequired
  },

  childContextTypes: {
    store: React.PropTypes.object
  },

  getChildContext() {
    return { store };
  },

  render() {
    return <div>{this.props.children}</div>;
  }
});

export default StoreProvider;
