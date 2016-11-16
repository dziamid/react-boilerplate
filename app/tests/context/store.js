import React, { Component } from 'react';

import configureStore from '../../../app/store';
import { browserHistory } from 'react-router';

class StoreProvider extends Component {
  static propTypes = {
    children: React.PropTypes.any.isRequired,
  };

  static childContextTypes = {
    store: React.PropTypes.object,
  };

  getChildContext() {
    return {
      store: configureStore({}, browserHistory),
    };
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

const store = (children) => <StoreProvider>{children}</StoreProvider>;

export default store;
