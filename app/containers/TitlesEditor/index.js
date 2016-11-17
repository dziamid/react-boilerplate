/*
 *
 * TitlesEditor
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';
import H1 from 'components/H1';
import SampleForm from 'components/SampleForm';
import SingleTitleEditor from '../SingleTitleEditor';
import FilterResults from '../FilterResults';
import FilterParams from '../FilterParams';
import Paper from 'material-ui/Paper';

export class TitlesEditor extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.titlesEditor}>
        <Helmet
          title="TitlesEditor"
          meta={[
            { name: 'description', content: 'Description of TitlesEditor' },
          ]}
        />
        <div className={styles.pageLayout}>
          <div className={styles.pageColumn}>
            <H1>
              <FormattedMessage {...messages.searchTitles} />
            </H1>
            <Paper className={styles.paper} zDepth={1}>
              <div className={styles.paperWrapper}>
                <FilterParams />
              </div>
              <FilterResults />
            </Paper>
          </div>
          <div className={styles.pageColumn}>
            <H1>
              <FormattedMessage {...messages.editSeniorityAndRelations} />
            </H1>
            <Paper className={styles.paper} zDepth={1}>
              <div className={styles.paperWrapper}>
                <SingleTitleEditor />
              </div>
            </Paper>
          </div>
        </div>
        <div className={styles.sampleFormWrapper} style={{ display: 'none' }}>
          <SampleForm />
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({}); // selectTitlesEditor();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TitlesEditor);
