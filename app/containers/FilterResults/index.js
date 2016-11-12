/*
 *
 * FilterResults
 *
 */

import React, { PropTypes, Component } from 'react';
// import selectFilterResults from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

import { connect } from 'react-redux';
import { Field, reduxForm, change, SubmissionError } from 'redux-form/immutable';
import TextField from 'components/TextField';
import Autocomplete from 'components/Autocomplete';
import Paper from 'material-ui/Paper';

export class FilterResults extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { handleSubmit, reset, submitting, dispatch, form } = this.props;

    const
      numFiltered = 20,
      numTotal = 104;

    return (
      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
          <span className={styles.selectHeader}>
            <FormattedMessage {...messages.select} />
          </span>
          <span className={styles.jobTitleCol}>
            <FormattedMessage {...messages.jobTitle} />
          </span>
          <span className={styles.seniorityCol}>
            <FormattedMessage {...messages.seniority} />
          </span>
          <span className={styles.relationCol}>
            <FormattedMessage {...messages.addRelation} />
          </span>
        </div>

        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
          return (
            <div className={styles.tableRow}>
          <span className={styles.selectCol}>
            <FormattedMessage {...messages.select} />
            -{i}
          </span>
              <span className={styles.jobTitleCol}>
            very very very very very very long
          </span>
              <span className={styles.seniorityCol}>
            <FormattedMessage {...messages.seniority} />
          </span>
              <span className={styles.relationCol}>
            <FormattedMessage {...messages.addRelation} />
          </span>
            </div>

          );
        })}
      </div>
    );
  }
}

FilterResults.propTypes = {
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  dispatch: PropTypes.func,
  form: PropTypes.string,
};

const mapStateToProps = () => {
  return {};
}; // selectFilterResults();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const validate = (values) => {
  const errors = {};

  if (!values.get('field1')) {
    errors.field1 = 'Required';
  }

  return errors;
};

const form = reduxForm({ form: 'FilterResults', validate })(FilterResults);
export default connect(mapStateToProps, mapDispatchToProps)(form);
