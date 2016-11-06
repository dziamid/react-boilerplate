import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Button from '../index';
import messages from './messages';
import { FormattedMessage, IntlProvider } from 'react-intl';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import OverviewIcon from 'material-ui/svg-icons/image/remove-red-eye';

storiesOf('Button', module)

  .add('with label', () => (
    <div>
      <Button onClick={action('clicked')} label="Default" default />
      <Button onClick={action('clicked')} label="Primary" primary />
      <Button onClick={action('clicked')} label="Secondary" secondary />
      <Button label="Icon&label" icon={<OverviewIcon />} onClick={action('clicked')} />
      <br />
      <Button onClick={action('clicked')} label="Default" default raised />
      <Button onClick={action('clicked')} label="Primary" primary raised />
      <Button onClick={action('clicked')} label="Secondary" secondary raised />
      <Button label="Icon&label" icon={<OverviewIcon />} raised onClick={action('clicked')} />
    </div>
  ))
  .add('with icons', () => (
    <div>
      <Button icon={<CloseIcon />} onClick={action('clicked')} />
      <Button icon={<OverviewIcon />} onClick={action('clicked')} />
    </div>
  ))

  .add('with internatalized content', () => (
    <div>
      <IntlProvider locale="en">
        <Button onClick={action('clicked')} default raised>
          <FormattedMessage {...messages.js} />
        </Button>
      </IntlProvider>
    </div>

  ));
