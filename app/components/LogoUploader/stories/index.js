import React from 'react';
import { storiesOf } from '@kadira/storybook';
import LogoUploader from '../index';

storiesOf('LogoUploader', module)
  .add('single logo', () => (
    <LogoUploader />
  ));
