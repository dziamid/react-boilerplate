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
import H3 from 'components/H3';
import SampleForm from 'components/SampleForm';
import SingleTitleEditor from '../SingleTitleEditor';
import FilterResults from '../FilterResults';
import FilterParams from '../FilterParams';
import Paper from 'material-ui/Paper';
import * as selectors from './selectors';

export class TitlesEditor extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { selectedTitle, selectedTitleRelations } = this.props;

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
            <H3>
              <FormattedMessage {...messages.searchTitles} />
            </H3>
            <Paper className={styles.paper} zDepth={1}>
              <div className={styles.paperWrapper}>
                <FilterParams />
                <FilterResults />
              </div>
            </Paper>
          </div>
          <div className={styles.pageColumn}>
            <H3>
              <FormattedMessage {...messages.editSeniorityAndRelations} />
            </H3>
            <Paper className={styles.paper} zDepth={1}>
              <div className={styles.paperWrapper}>
                <SingleTitleEditor
                  title={selectedTitle}
                  relations={selectedTitleRelations}
                />
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

const mapStateToProps = (state) => ({
  selectedTitle: selectors.selectedTitle()(state),
  selectedTitleRelations: selectors.selectedTitleRelations()(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(TitlesEditor);
