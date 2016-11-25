import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import LogoUploader from '../index';

storiesOf('LogoUploader', module)
  .add('single logo', () => (
    <LogoUploader input={{ onChange: action('onChange') }} />
  ))
  .add('multiple logo', () => (
    <LogoUploader multiple input={{ onChange: action('onChange') }} />
  ));
