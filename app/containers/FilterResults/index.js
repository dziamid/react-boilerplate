/*
 *
 * FilterResults
 *
 */

import React, { PropTypes, Component } from 'react';
import { selectFilterResults, selectResultsList } from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';

import { updateResults } from './actions';

import { connect } from 'react-redux';
import { Field, reduxForm, change, SubmissionError } from 'redux-form/immutable';

export class FilterResults extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { results, updateResults, handleSubmit, reset, submitting, dispatch, form } = this.props;

    const singleResult = r => (
      <div className={styles.tableRow}>
          <span className={styles.selectCol}>
            select
          </span>
        <span className={styles.jobTitleCol}>
                {r.jobTitle}
          </span>
        <span className={styles.seniorityCol}>
                {r.seniority}
          </span>
        <span className={styles.relationCol}>
                {r.relations}
          </span>
      </div>
    );

    return (
      <div>
        <button onClick={updateResults}>UPDATE RESULTS</button>
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

          {results.map(r => singleResult(r))}
        </div>
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

const mapStateToProps = createStructuredSelector({
  results: selectResultsList(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateResults: () => dispatch(updateResults()),
  };
}

const validate = (values) => {
  const errors = {};

  if (!values.get('field1')) {
    errors.field1 = 'Required';
  }

  return errors;
};

const form = reduxForm({ form: 'filterResults', validate })(FilterResults);
export default connect(mapStateToProps, mapDispatchToProps)(form);
