/**
 * Testing our LogoUploader component
 */
import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import LogoUploader from '../index';
import injectTapEvent from 'utils/react-tap-event-plugin';
injectTapEvent();

describe('<LogoUploader />', () => {
  it('should render LogoUploader with icon', () => {
    const wrapper = shallow(
      <LogoUploader />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

