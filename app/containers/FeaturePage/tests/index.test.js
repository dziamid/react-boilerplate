import { shallow, mount } from 'enzyme';

import React from 'react';

import { FormattedMessage } from 'react-intl';
import { default as context } from 'tests/context/all';
import { push } from 'react-router-redux';

import messages from '../messages';
import { FeaturePage } from '../index';
import H1 from 'components/H1';
import injectTapEvent from 'utils/react-tap-event-plugin';
injectTapEvent();

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

  it('should redirect to "/" when button clicked', () => {
    const dispatch = jest.fn();

    const renderedComponent = mount(context(
      <FeaturePage dispatch={dispatch} />
    ));

    const button = renderedComponent.find('button');
    button.simulate('click');
    expect(dispatch).toHaveBeenCalledWith(push('/'));
  });
});
