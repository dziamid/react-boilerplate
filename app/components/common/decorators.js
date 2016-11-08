import React, { Component } from 'react';

import { IntlProvider } from 'react-intl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { default as defaultTheme } from 'theme';
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

export const store = (children) => <StoreProvider>{children}</StoreProvider>;
export const intl = (children) => <IntlProvider locale="en">{children}</IntlProvider>;
export const theme = (children) => <MuiThemeProvider muiTheme={getMuiTheme(defaultTheme)}>{children}</MuiThemeProvider>;
export const context = (children) => theme(intl(children)); // todo: remove this, use each provider where needed for simplifity
