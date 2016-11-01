import React from 'react';

import { IntlProvider } from 'react-intl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { default as defaultTheme } from 'theme';

export const intl = (children) => <IntlProvider locale="en">{children}</IntlProvider>;
export const theme = (children) => <MuiThemeProvider muiTheme={getMuiTheme(defaultTheme)}>{children}</MuiThemeProvider>;
export const context = (children) => theme(intl(children));
