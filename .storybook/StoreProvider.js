import React from 'react'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import Toastr from 'components/Toastr';
import rootSaga from './saga';

const reducer = combineReducers({
  form: reduxFormReducer,
  toastr: toastrReducer,
});

const devtools = window.devToolsExtension || (() => (noop) => noop);
const sagaMiddleware = createSagaMiddleware();

const enhancers = [
  applyMiddleware(sagaMiddleware),
  devtools(),
];

const store = createStore(
  reducer,
  compose(...enhancers),
);

sagaMiddleware.run(rootSaga);

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
