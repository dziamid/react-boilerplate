import React from 'react'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { reducer as reduxFormReducer } from 'redux-form';
import toastrReducer from 'components/Toastr/reducer';
import Toastr from 'components/Toastr';
import rootSaga from './saga';
import injectTapEvent from "utils/react-tap-event-plugin";

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
