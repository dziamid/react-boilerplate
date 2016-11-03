import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { reducer as reduxFormReducer } from 'redux-form/immutable';
import toastrReducer from 'components/Toastr/reducer';
import Toastr from 'components/Toastr';
import rootSaga from './saga';
import injectTapEvent from 'utils/react-tap-event-plugin';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

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
  fromJS({}),
  compose(...enhancers),
);

sagaMiddleware.run(rootSaga);
injectTapEvent();

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
