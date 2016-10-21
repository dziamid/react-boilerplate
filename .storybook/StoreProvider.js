import React from 'react'
import { createStore as reduxCreateStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import Toastr from 'components/Toastr';

const reducer = combineReducers({
  form: reduxFormReducer,
  toastr: toastrReducer,
});

const devTools = window.devToolsExtension;
const createStore = devTools ? devTools()(reduxCreateStore) : reduxCreateStore();
const store = (createStore)(reducer);

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
    return (
      <div>
        <Toastr />
        {this.props.children}
      </div>
    );
  }
});

export default StoreProvider;
