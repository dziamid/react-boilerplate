import React from 'react';
import FilterResults from '../index';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';


describe('<FilterResults />', () => {
  it('should render show all companies correctly', () => {
    const wrapper = shallow(
      <FilterResults results={[]} />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
