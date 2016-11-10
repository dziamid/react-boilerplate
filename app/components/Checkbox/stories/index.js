import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Checkbox from '../index';

const parentProps = (checked) => ({
  input: { name: 'field1', value: checked },
  meta: {},
});

const layoutStyle = {
  maxWidth: '256px',
  margin: '20px',
};
const layout = (getStory) => <div style={layoutStyle}>{getStory()}</div>

storiesOf('Checkbox', module)
  .addDecorator(layout)
  .add('default', () => (
    <div>
      <Checkbox {...parentProps(false)} />
      <Checkbox {...parentProps(true)} />
    </div>
  ))
  .add('with label on the left', () => (
    <div>
      <Checkbox label="Label on the left" {...parentProps(false)} />
      <Checkbox label="Label on the left" {...parentProps(true)} />
    </div>
  ));
