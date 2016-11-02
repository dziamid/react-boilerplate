/**
 * Testing our Button component
 */
import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CompaniesFilter from '../index';
// import { context } from 'components/common/decorators';
const noop = () => {};

import injectTapEvent from 'utils/react-tap-event-plugin';
injectTapEvent();


describe.only('<CompaniesFilter />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <CompaniesFilter onChange={noop} onCompanySelected={noop} onCompanyUnselected={noop} />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  xit('should call onChange when users click selects another menu item');
  xit('should call onCompanySelected when users checks a company in custom filter');
  xit('should call onCompanyUnselected when users unchecks a company in custom filter');
});
