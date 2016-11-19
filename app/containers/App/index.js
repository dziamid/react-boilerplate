/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import Header from 'components/Header';
import Toastr from 'components/Toastr';

import styles from './styles.css';

const loggedInUser = {
  username: 'gordon',
  email: 'gordonvaughan@sequitur.com',
  name: 'Gordon Vaughan',
};


function App(props) {
  return (
    <div>
      <Header user={loggedInUser} />
      <div className={styles.wrapper}>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application' },
          ]}
        />
        {React.Children.toArray(props.children)}
        <Toastr />
      </div>
    </div>

  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
