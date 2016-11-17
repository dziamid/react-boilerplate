/*
 *
 * FilterResults
 *
 */

import React, { PropTypes, Component } from 'react';
import { selectFilterResults, selectResultsList } from './selectors';
import selectFilterParams from 'containers/FilterParams/selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';

import { setSelectedTitle } from './actions';

import { connect } from 'react-redux';
import { Field, reduxForm, change, SubmissionError } from 'redux-form/immutable';
import Button from 'components/Button'

export class FilterResults extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      results,
      updateResults,
      filterParams: {
        titles,
      },
      filterText,
      setSelectedTitle,
      selectedTitle
    } = this.props;

    const filteredTitles = titles ?
      titles.filter(t => t.title.toLowerCase().includes((filterText || '').trim()))
      : [];

    const
      total = (titles || []).length,
      filtered = filteredTitles.length;

    const statusLine = `Displaying ${filtered} out of ${total} Titles`;

    const getRowStyle = (id) => {
      if (selectedTitle === id) {
        return styles.selectedRow;
      } else {
        return styles.tableRow;
      }
    };

    const singleResult = t => (
      <div className={getRowStyle(t._id)}>
          <span className={styles.selectCol}>
            <Button
              raised
              onClick={() => setSelectedTitle(t._id)}>Select</Button>
          </span>
        <span className={styles.jobTitleCol}>
                {t.title}
          </span>
        <span className={styles.seniorityCol}>
                {t.seniority}
          </span>
        <span className={styles.relationCol}>
                {t.relations}
          </span>
      </div>
    );

    return (
      <div>
        <div>
          {statusLine}
        </div>
        <div className={styles.tableWrapper}>
          <div className={styles.tableHeader}>
          <span className={styles.selectHeader}>
            <FormattedMessage {...messages.select} />
          </span>
            <span className={styles.jobTitleHeader}>
            <FormattedMessage {...messages.jobTitle} />
          </span>
            <span className={styles.seniorityCol}>
            <FormattedMessage {...messages.seniority} />
          </span>
            <span className={styles.relationCol}>
            <FormattedMessage {...messages.addRelation} />
          </span>
          </div>

          {filteredTitles.map(t => singleResult(t))}
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
  // results: selectResultsList(),
  filterParams: selectFilterParams(),
  filterText: (state) => state.getIn(['form', 'FilterParams', 'values', 'filter']),
  selectedTitle: (state) => state.getIn(['titlesEditorRoot', 'filterResults', 'selectedTitle'])
});

function mapDispatchToProps(dispatch) {
  return {
    setSelectedTitle: (titleId) => dispatch(setSelectedTitle(titleId)),
  };
}

const validate = (values) => {
  const errors = {};

  if (!values.get('field1')) {
    errors.field1 = 'Required';
  }

  return errors;
};

const form = reduxForm({form: 'filterResults', validate})(FilterResults);
export default connect(mapStateToProps, mapDispatchToProps)(form);
