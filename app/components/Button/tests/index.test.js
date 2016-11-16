/**
 * Testing our Button component
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Button from '../index';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from 'theme';
import injectTapEvent from 'utils/react-tap-event-plugin';
injectTapEvent();

const themed = (children) => <MuiThemeProvider muiTheme={getMuiTheme(theme)}>{children}</MuiThemeProvider>;
const noop = () => {};

describe('<Button />', () => {
  it('should render Button with label', () => {
    const wrapper = shallow(
      <Button label="Button with label" onClick={noop} />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render Button with svg icon', () => {
    const wrapper = shallow(
      <Button icon={<CloseIcon />} onClick={noop} />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });


  it('should handle click events with label', () => {
    const onClickSpy = jest.fn();
    const wrapper = mount(
      themed(<Button onClick={onClickSpy} label="Button with label" />)
    );

    wrapper.find('button').simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('should handle click events with icon', () => {
    const onClickSpy = jest.fn();
    const wrapper = mount(
      themed(<Button onClick={onClickSpy} icon={<CloseIcon />} />)
    );

    wrapper.find('button').simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });
});
