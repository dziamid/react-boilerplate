import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Navigation from '../index';

const Layout = ({ children }) => (
  <div style={{ width: '256px' }}>
    {children}
  </div>
);

storiesOf('Navigation', module)
  .addDecorator((getStory) => <Layout>{getStory()}</Layout>)
  .add('default', () => (
    <Navigation />
  ));
