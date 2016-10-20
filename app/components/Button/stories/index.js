import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Button from '../index';

storiesOf('Button', module)

  .add('Raised buttons', () => (
    <div>
      <Button onClick={action('clicked')} label="Default" default raised />
      <Button onClick={action('clicked')} label="Primary" primary raised />
      <Button onClick={action('clicked')} label="Secondary" secondary raised />
    </div>
  ))
  .add('Flat buttons', () => (
    <div>
      <Button onClick={action('clicked')} label="Default" default />
      <Button onClick={action('clicked')} label="Primary" primary />
      <Button onClick={action('clicked')} label="Secondary" secondary />
    </div>
  ))

  .add('Close button', () => (
    <Button icon="close" />
  ));
