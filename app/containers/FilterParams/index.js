/*
 *
 * FilterParams
 *
 */

import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

import { connect } from 'react-redux';
import { Field, reduxForm, change, SubmissionError } from 'redux-form/immutable';
import TextField from 'components/TextField';
import Autocomplete from 'components/Autocomplete';

import { fetchSubCategories, fetchTitles, filterResults } from 'containers/TitlesEditor/actions';

import { jobCategories } from './mocks';

export class FilterParams extends Component { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    fields: ['title', 'category', 'subCategory'],
  };

  render() {
    const {
      subCategories,
      loading,
      error,
      fetchSubCategories,
      fetchTitles,
    } = this.props;

    return (
      <div className={styles.paper}>
        <div className={styles.FilterParams}>
          {this.props.fields.indexOf('category') !== -1 ?
            <div className={styles.formRow}>
              <Field
                name="category"
                component={Autocomplete}
                dataSource={jobCategories.map(c => ({ text: c.name, value: c.id }))}
                onNewRequest={item => fetchSubCategories(item.value)}

                label={<FormattedMessage {...messages.category} />}
                className={styles.filterField}
                fullWidth
                noFreetext
                openOnFocus
              />
            </div>
            : null }

          {this.props.fields.indexOf('subCategory') !== -1 ?
            <div className={styles.formRow}>
              <Field
                name="subCategory"
                component={Autocomplete}
                dataSource={subCategories.map(s => ({ text: s.name, value: s.id }))}
                label={<FormattedMessage {...messages.subCategory} />}
                className={styles.filterField}
                onNewRequest={item => fetchTitles(item.value)}
                fullWidth
                noFreetext
                openOnFocus
              />
            </div>
            : null }

          {this.props.fields.indexOf('title') !== -1 ?
            <div className={styles.formRow}>
              <Field
                name="title"
                component={TextField}
                label={<FormattedMessage {...messages.filter} />}
                className={styles.filterField}
              />
            </div>
            : null }

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

const mapStateToProps = (state) => ({
  categories: state.getIn(['titlesEditorRoot', 'categories']),
  subCategories: state.getIn(['titlesEditorRoot', 'subCategories']),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSubCategories: categoryId => dispatch(fetchSubCategories(categoryId)),
    fetchTitles: subCategoryId => dispatch(fetchTitles(subCategoryId)),
    filterResults: filterText => dispatch(filterResults(filterText)),
  };
}

const form = reduxForm()(FilterParams);
export default connect(mapStateToProps, mapDispatchToProps)(form);
