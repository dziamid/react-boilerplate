import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Button from '../index';

storiesOf('Button', module)

  .add('Default', () => (
    <Button onClick={action('clicked')} label="Default" default />
  ))
  .add('Primary', () => (
    <Button onClick={action('clicked')} label="Primary" primary />
  ))
  .add('Secondary', () => (
    <Button onClick={action('clicked')} label="Secondary" secondary />
  ))
  .add('Close button', () => (
    <Button icon="close" />
  ));
