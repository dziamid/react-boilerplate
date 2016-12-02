import { shallow } from 'enzyme';
import React from 'react';

import App from '../index';
import Header from 'components/Header';
import injectTapEvent from 'utils/react-tap-event-plugin';
injectTapEvent();

describe('<App />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <App>
        {children}
      </App>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should render header', () => {
    const renderedComponent = shallow(
      <App />
    );
    expect(renderedComponent.find(Header).length).toBe(1);
  });
});
