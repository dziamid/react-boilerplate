/*
 *
 * TitlesEditor
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';
import H3 from 'components/H3';
import SingleTitleEditor from '../SingleTitleEditor';
import FilterResults from '../FilterResults';
import FilterParams from '../FilterParams';
import Paper from 'material-ui/Paper';
import * as selectors from './selectors';
import { DEFAULT_PROXIMITY } from 'mocks/proximities';
import Spinner from 'material-ui/svg-icons/action/autorenew';

import {
  patchSeniority,
  patchProximity,
  destroyRelation,
  setSelectedTitle,
  createRelation,
} from './actions';

export class TitlesEditor extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.handleProximityChange = this.handleProximityChange.bind(this);
  }

  handleProximityChange(relation, proximity) {
    const {
      createRelation,
      destroyRelation,
      patchProximity,
    } = this.props;

    if (proximity === DEFAULT_PROXIMITY) {
      destroyRelation(relation);
    } else if (relation.id === undefined) {
      createRelation({ ...relation, proximity });
    } else {
      patchProximity(relation, proximity);
    }
  }

  render() {
    const {
      selectedTitle,
      selectedTitleRelations,
      loading,
      error,
    } = this.props;

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
              <span style={{ position: 'absolute' }}>
                {loading ? <Spinner className={styles.spinner} /> : null}
                {error ? 'error!' : null}
              </span>

            </H3>
            <Paper className={styles.paper} zDepth={1}>
              <div className={styles.paperWrapper}>
                <FilterParams form="TitleEditor" />
                <FilterResults
                  results={this.props.filteredTitles}
                  titlesTotal={this.props.titlesTotal}
                  selectedTitle={this.props.selectedTitleId}
                  relations={this.props.relations}
                  onRowSelection={this.props.setSelectedTitle}
                />
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
                  title={selectedTitle || {}}
                  relations={selectedTitleRelations}
                  onSeniorityChange={this.props.patchSeniority}
                  onProximityChange={this.handleProximityChange}
                  onRelationRemove={this.props.destroyRelation}
                />
              </div>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedTitle: selectors.selectedTitle()(state),
  selectedTitleRelations: selectors.selectedTitleRelationsSorted()(state),
  filteredTitles: selectors.filteredTitles()(state),
  titlesTotal: selectors.titlesTotal()(state),
  selectedTitleId: selectors.selectedTitleId()(state),
  relations: selectors.relations()(state),
  loading: state.getIn(['titlesEditorRoot', 'loading']),
  error: state.getIn(['titlesEditorRoot', 'error']),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  patchSeniority,
  patchProximity,
  setSelectedTitle,
  createRelation,
  destroyRelation,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TitlesEditor);
