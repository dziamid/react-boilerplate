import React from 'react';
import { configure, addDecorator } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from '../app/theme';
import StoreProvider from './StoreProvider';


import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

function loadStories() {
  require('./index');
}
addDecorator((story) => <StoreProvider>{story()}</StoreProvider>);
addDecorator((story) => <MuiThemeProvider muiTheme={getMuiTheme(theme)}>{story()}</MuiThemeProvider>);
configure(loadStories, module);
