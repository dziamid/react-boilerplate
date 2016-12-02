import React from 'react';
import { TitlesEditor } from '../index';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('<TitlesEditor />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <TitlesEditor />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

