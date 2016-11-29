import React from 'react';
import { storiesOf } from '@kadira/storybook';
import InstructionSidebar from '../index';

const listStyle = { padding: '0 0 15px', fontFamily: '"Lato", sans-serif', fontSize: '13px', fontWeight: 300, lineHeight: '17px', color: '#1F768A', letterSpacing: 0 };
const ulStyle = { listStyle: 'none', padding: 0, margin: 0, width: '230px' };
const footerInfo = {
  position: 'Senior UX/UI Designer',
  company: 'Airbnb HQ - San-Francisco',
  workflow: 'Hiring Workflow 1',

};
const body = (
  <ul style={ulStyle}>
    <li style={listStyle}>Nunc non diam metus. Fusce ornare pretium sodales.</li>
    <li style={listStyle}>Vivamus semper, tortor vel efficitur.</li>
    <li style={listStyle}>Maecenas faucibus mollis interdum.</li>
    <li style={listStyle}>Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur pit amet fermentum.</li>
  </ul>
);

storiesOf('InstructionSidebar', module)

  .add('without footer', () => (
    <InstructionSidebar body={body} />
  ))
  .add('with footer', () => (
    <InstructionSidebar body={body} footer footerInfo={footerInfo} />
  ));
