import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import InstructionsSidebar from '../index';
import injectTapEvent from 'utils/react-tap-event-plugin';
injectTapEvent();

const summary = {
  position: 'Senior UX/UI Designer',
  company: 'Airbnb HQ - San-Francisco',
  workflow: 'Hiring Workflow 1',

};

describe('<InstructionsSidebar />', () => {
  it('should render InstructionsSidebar without summary', () => {
    const wrapper = shallow(
      <InstructionsSidebar />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should render InstructionsSidebar with summary', () => {
    const wrapper = shallow(
      <InstructionsSidebar summary={summary} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
