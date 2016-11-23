/*
 *
 * FilterParams
 *
 */

import React, { PropTypes, Component } from 'react';
import { selectFilterParams } from 'containers/TitlesEditor/selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

import { connect } from 'react-redux';
import { Field, reduxForm, change, SubmissionError } from 'redux-form/immutable';
import TextField from 'components/TextField';
import Autocomplete from 'components/Autocomplete';
import { createStructuredSelector } from 'reselect';

import { fetchSubCategories, fetchTitles, filterResults } from 'containers/TitlesEditor/actions';

import { jobCategories } from './mocks';

export class FilterParams extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      filterParams: {
        categories,
        subCategories,
        loading,
        error,
      },
      fetchSubCategories,
      fetchTitles,
      filterResults,
    } = this.props;

    return (
      <div className={styles.paper}>
        <div className={styles.FilterParams}>
          <div className={styles.formRow}>
            <Field
              name="category"
              component={Autocomplete}
              dataSource={jobCategories.map(j => ({ text: j.name, value: j.id }))}
              label={<FormattedMessage {...messages.category} />}
              className={styles.filterField}
              onNewRequest={item => fetchSubCategories(item.value)}
              fullWidth
            />
          </div>

          <div className={styles.formRow}>
            <Field
              name="subCategory"
              component={Autocomplete}
              dataSource={subCategories.map(s => ({ text: s.name, value: s.id }))}
              label={<FormattedMessage {...messages.subCategory} />}
              className={styles.filterField}
              onNewRequest={item => fetchTitles(item.value)}
              fullWidth
            />
          </div>

          <div className={styles.formRow}>
            <Field
              name="filter"
              component={TextField}
              label={<FormattedMessage {...messages.filter} />}
              className={styles.filterField}
            />
          </div>
          <span style={{ position: 'absolute', background: 'yellow' }}>
            {loading ? 'loading...' : ''}
            {error ? 'error!' : ''}
          </span>

        </div>
      </div>
    );
  }
}

FilterParams.propTypes = {
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  dispatch: PropTypes.func,
  form: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  filterParams: selectFilterParams(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSubCategories: categoryId => dispatch(fetchSubCategories(categoryId)),
    fetchTitles: subCategoryId => dispatch(fetchTitles(subCategoryId)),
    filterResults: filterText => dispatch(filterResults(filterText)),
  };
}

const validate = (values) => {
  const errors = {};

  if (!values.get('field1')) {
    errors.field1 = 'Required';
  }

  return errors;
};

const form = reduxForm({ form: 'FilterParams', validate })(FilterParams);
export default connect(mapStateToProps, mapDispatchToProps)(form);
