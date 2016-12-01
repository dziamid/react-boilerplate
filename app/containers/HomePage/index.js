/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import Helmet from 'react-helmet';

import messages from './messages';
import {createStructuredSelector} from 'reselect';

import {
  selectRepos,
  selectLoading,
  selectError,
} from 'containers/App/selectors';

import {
  selectUsername,
} from './selectors';

import {changeUsername} from './actions';
import {loadRepos} from '../App/actions';

import {FormattedMessage} from 'react-intl';
import RepoListItem from 'containers/RepoListItem';
import Button from 'components/Button';
import H2 from 'components/H2';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import SampleForm from 'components/SampleForm';
import InstructionsSidebar from 'components/InstructionsSidebar';
import styles from './styles.css';

const listStyle = {
  padding: '0 0 15px',
  fontFamily: '"Lato", sans-serif',
  fontSize: '13px',
  fontWeight: 300,
  lineHeight: '17px',
  color: '#1F768A',
  letterSpacing: 0
};
const ulStyle = {listStyle: 'none', padding: 0, margin: 0, width: '230px'};
const summary = {
  position: 'Senior UX/UI Designer',
  company: 'Airbnb HQ - San-Francisco',
  workflow: 'Hiring Workflow 1',

};
const body = (
  <ul style={ulStyle}>
    <li style={listStyle}>Nunc non diam metus. Fusce ornare pretium sodales.</li>
    <li style={listStyle}>Vivamus semper, tortor vel efficitur.</li>
    <li style={listStyle}>Maecenas faucibus mollis interdum.</li>
    <li style={listStyle}>Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur
      pit amet fermentum.
    </li>
  </ul>
);

export class HomePage extends React.Component {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  /**
   * Changed route to '/features'
   */
  openFeaturesPage = () => {
    this.openRoute('/features');
  };

  render() {
    let mainContent = null;

    // Show a loading indicator when we're loading
    if (this.props.loading) {
      mainContent = (<List component={LoadingIndicator}/>);

      // Show an error if there is one
    } else if (this.props.error !== false) {
      const ErrorComponent = () => (
        <ListItem item={'Something went wrong, please try again!'}/>
      );
      mainContent = (<List component={ErrorComponent}/>);

      // If we're not loading, don't have an error and there are repos, show the repos
    } else if (this.props.repos !== false) {
      mainContent = (<List items={this.props.repos} component={RepoListItem}/>);
    }

    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application homepage' },
          ]}
        />
        <div>
          <div className={styles.form_sidebar}>
            <div className={styles.form}><SampleForm /></div>
            <div className={styles.sidebar}><InstructionsSidebar body={body} summary={summary}/></div>
          </div>
          <section className={styles.textSection}>
            <H2>
              <FormattedMessage {...messages.trymeHeader} />
            </H2>
            <form className={styles.usernameForm} onSubmit={this.props.onSubmitForm}>
              <label htmlFor="username">
                <FormattedMessage {...messages.trymeMessage} />
                <span className={styles.atPrefix}>
                  <FormattedMessage {...messages.trymeAtPrefix} />
                </span>
                <input
                  id="username"
                  className={styles.input}
                  type="text"
                  placeholder="mxstbr"
                  value={this.props.username}
                  onChange={this.props.onChangeUsername}
                />
              </label>
            </form>
            {mainContent}
          </section>
          <Button data-id="features" onClick={this.openFeaturesPage}>
            <FormattedMessage {...messages.featuresButton} />
          </Button>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  changeRoute: React.PropTypes.func,
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  username: React.PropTypes.string,
  onChangeUsername: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    changeRoute: (url) => dispatch(push(url)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },

    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  repos: selectRepos(),
  username: selectUsername(),
  loading: selectLoading(),
  error: selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
