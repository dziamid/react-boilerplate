/**
 * Testing our Button component
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json'
import Button from '../index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from 'theme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin(); //surpress onTouchTap warnings

const themed = (children) => <MuiThemeProvider muiTheme={getMuiTheme(theme)}>{children}</MuiThemeProvider>
const noop = () => {};

describe('<Button />', () => {

  it('should render Button with label', () => {
    const wrapper = shallow(
      <Button label="Button with label" onClick={noop} />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render Button with a known icon', () => {
    const wrapper = shallow(
      <Button icon="close" onClick={noop} />

    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });


  it('should handle click events', () => {
    const onClickSpy = jest.fn();
    const wrapper = mount(
      themed(<Button onClick={onClickSpy} icon="close" />)
    );

    wrapper.find('button').simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });

});
