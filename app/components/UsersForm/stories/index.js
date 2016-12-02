import React from 'react';
import { storiesOf } from '@kadira/storybook';
import UsersForm from '../index';

const Layout = ({ children }) => (
  <div style={{ margin: '20px' }}>{children}</div>
);

storiesOf('UsersForm', module)
  .addDecorator(getStory => <Layout>{getStory()}</Layout>)
  .add('default', () => (
    <UsersForm />
  ));
