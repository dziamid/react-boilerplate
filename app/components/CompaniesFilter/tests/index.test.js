/**
 * Testing our Button component
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CompaniesFilter from '../index';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { default as theme } from 'theme';
import companies from '../../../../mocks/companies';


const noop = () => {
};

const mountOpts = {
  context: { muiTheme: getMuiTheme(theme) },
  childContextTypes: { muiTheme: React.PropTypes.object },
};

import injectTapEvent from 'utils/react-tap-event-plugin';
injectTapEvent();

const props = (override) => ({
  value: 'all',
  onFilterChange: noop,
  onCompanySelected: noop,
  onCompanyUnselected: noop,
  companies,
  selectedCompanies: [companies[0]],
  ...override,
});

describe('<CompaniesFilter />', () => {
  it('should render show all companies correctly', () => {
    const wrapper = shallow(
      <CompaniesFilter {...props({ value: 'all' })} />
    );

    expect(shallowToJson(wrapper.find('MenuItem').at(0))).toMatchSnapshot();
  });

  it('should render show custom filter correctly', () => {
    const wrapper = shallow(
      <CompaniesFilter {...props({ value: 'custom' })} />
    );

    expect(shallowToJson(wrapper.find('MenuItem').at(1))).toMatchSnapshot();
    expect(shallowToJson(wrapper.find('[data-id="companies"]'))).toMatchSnapshot();
  });

  it('should render favorite filter correctly', () => {
    const wrapper = shallow(
      <CompaniesFilter {...props({ value: 'favorite' })} />
    );

    expect(shallowToJson(wrapper.find('MenuItem').at(2))).toMatchSnapshot();
  });

  xit('should call onFilterChange when user selects another menu item', () => {
    // turns out enzyme does not support event propagation in mount mode,
    // so this does not work
    // https://github.com/airbnb/enzyme/issues/308
    const onFilterChange = jest.fn();
    const wrapper = mount(
      <CompaniesFilter {...props({ onFilterChange })} />,
      mountOpts,
    );

    wrapper.find('MenuItem').first().simulate('click');
    expect(onFilterChange).toHaveBeenCalled();
  });

  xit('should call onCompanySelected when users checks a company in custom filter');
  xit('should call onCompanyUnselected when users unchecks a company in custom filter');
});
