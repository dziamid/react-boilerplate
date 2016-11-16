import React from 'react';

import { IntlProvider } from 'react-intl';
const intl = (children) => <IntlProvider locale="en">{children}</IntlProvider>;

export default intl;
