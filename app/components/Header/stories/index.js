import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Header from '../index';
import AddMenu from '../AddMenu';

const Layout = ({ children }) => (
  <div style={{ minWidth: '1260px', maxWidth: '1920px' }}>
    {children}
  </div>
);

const loggedInUser = {
  username: 'gordon',
  email: 'gordonvaughan@sequitur.com',
  name: 'Gordon Vaughan',
};

storiesOf('Header', module)
  .addDecorator((getStory) => <Layout>{getStory()}</Layout>)
  .add('logged out', () => (
    <Header />
  ))
  .add('logged in', () => (
    <Header user={loggedInUser} />
  ))
  .add('add popover', () => (
    <div style={{ width: '256px' }}>
      <AddMenu />
    </div>
  ));
