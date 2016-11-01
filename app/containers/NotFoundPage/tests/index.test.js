/**
 * Testing the NotFoundPage
 */

import { shallow, mount } from 'enzyme';
import { context } from 'components/common/decorators';

import React from 'react';

import { FormattedMessage } from 'react-intl';
import { NotFound } from '../index';
import H1 from 'components/H1';
import Button from 'components/Button';
import { push } from 'react-router-redux';

describe('<NotFound />', () => {
  it('should render the Page Not Found text', () => {
    const renderedComponent = shallow(
      <NotFound />
    );
    expect(renderedComponent.contains(
      <H1>
        <FormattedMessage
          id="boilerplate.containers.NotFoundPage.header"
          defaultMessage={'Page not found.'}
        />
      </H1>)).toEqual(true);
  });

  it('should render a button', () => {
    const renderedComponent = shallow(
      <NotFound />
    );
    const renderedButton = renderedComponent.find(Button);
    expect(renderedButton.length).toBe(1);
  });

  it('should redirect to "/" when button clicked', () => {
    const dispatch = jest.fn();

    const renderedComponent = mount(context(
      <NotFound dispatch={dispatch} />
    ));

    const button = renderedComponent.find('button');
    button.simulate('click');
    expect(dispatch).toHaveBeenCalledWith(push('/'));
  });
});
