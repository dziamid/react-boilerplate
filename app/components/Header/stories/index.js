import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Header from '../index';

const Layout = ({ children }) => (
  <div style={{ minWidth: '1260px', maxWidth: '1920px' }}>
    {children}
  </div>
);

storiesOf('Header', module)
  .addDecorator((getStory) => <Layout>{getStory()}</Layout>)
  .add('logged out', () => (
    <Header />
  ));
