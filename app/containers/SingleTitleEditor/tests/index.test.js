import React from 'react';
import SingleTitleEditor from '../index';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('<SingleTitleEditor />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <SingleTitleEditor />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

