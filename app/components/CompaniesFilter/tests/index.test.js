/**
 * Testing our Button component
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CompaniesFilter from '../index';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { default as theme } from 'theme';

const noop = () => {
};

const mountOpts = {
  context: { muiTheme: getMuiTheme(theme) },
  childContextTypes: { muiTheme: React.PropTypes.object },
};

import injectTapEvent from 'utils/react-tap-event-plugin';
injectTapEvent();

const defaultProps = {
  value: 'favorite',
  onFilterChange: noop,
  onCompanySelected: noop,
  onCompanyUnselected: noop,
};

describe('<CompaniesFilter />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <CompaniesFilter {...defaultProps} />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  xit('should call onFilterChange when user selects another menu item', () => {
    const onChangeSpy = jest.fn();
    const wrapper = mount(
      <CompaniesFilter {...defaultProps} onFilterChange={onChangeSpy} />,
      mountOpts,
    );

    // todo: use attribute and(or) constructor selectors,
    // for some reason '[value="all"]' selector yields no result
    const firstMenuItem = wrapper.find('MenuItem').first();
    console.log(firstMenuItem.debug());
    firstMenuItem.simulate('click');

    expect(onChangeSpy).toHaveBeenCalledWith('all');
  });

  xit('should call onCompanySelected when users checks a company in custom filter');
  xit('should call onCompanyUnselected when users unchecks a company in custom filter');
});
