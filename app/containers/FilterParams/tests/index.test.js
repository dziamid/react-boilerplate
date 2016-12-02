import React from 'react';
import { FilterParams } from '../index';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';


describe('<FilterParams />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <FilterParams />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

