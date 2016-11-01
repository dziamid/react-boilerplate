import { shallow, mount } from 'enzyme';

import React from 'react';

import { FormattedMessage } from 'react-intl';
import { context } from 'components/common/decorators';

import messages from '../messages';
import { FeaturePage } from '../index';
import H1 from 'components/H1';

describe('<FeaturePage />', () => {
  it('should render its heading', () => {
    const renderedComponent = shallow(
      <FeaturePage />
    );
    expect(renderedComponent.contains(
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
    )).toBe(true);
  });

  it('should link to "/"', () => {
    const openRouteSpy = jest.fn();

    // Spy on the openRoute method of the FeaturePage
    const openRoute = (dest) => {
      if (dest === '/') {
        openRouteSpy();
      }
    };

    const renderedComponent = mount(context(
      <FeaturePage changeRoute={openRoute} />
    ));
    const button = renderedComponent.find('button');
    button.simulate('click');
    expect(openRouteSpy).toHaveBeenCalled();
  });
});
