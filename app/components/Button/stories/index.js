import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Button from '../index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

storiesOf('Button', module)
  .addDecorator((story) => <MuiThemeProvider>{story()}</MuiThemeProvider>)
  .add('Raised buttons', () => (
    <div>
      <Button onClick={action('clicked')} label="Default" default />
      <Button onClick={action('clicked')} label="Primary" primary />
      <Button onClick={action('clicked')} label="Secondary" secondary />
      <Button onClick={action('clicked')} label="Disabled" disabled />
    </div>
  ));
