import React from 'react';
import { storiesOf } from '@kadira/storybook';
import A from '../index';

const href = window.parent.location.href;

storiesOf('A', module)
  .add('default link', () => (
    <p>Lorem ipsum dolor sit amet <A href={href}>consectetur</A> adipiscing elit.</p>
  ))
  .add('new tab link', () => (
    <p>Lorem ipsum dolor sit amet <A href={href} target="_blank">consectetur</A> adipiscing elit.</p>
  ));
