import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { default as defaultTheme } from 'theme';

const theme = (children) => <MuiThemeProvider muiTheme={getMuiTheme(defaultTheme)}>{children}</MuiThemeProvider>;

export default theme;
