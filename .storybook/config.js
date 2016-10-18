import React from 'react';
import { configure, addDecorator } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from '../app/theme';

function loadStories() {
  require('./index');
}
addDecorator((story) => <MuiThemeProvider muiTheme={getMuiTheme(theme)}>{story()}</MuiThemeProvider>);
configure(loadStories, module);
