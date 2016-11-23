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
import SingleTitleEditor from '../SingleTitleEditor';
import FilterResults from '../FilterResults';
import FilterParams from '../FilterParams';
import Paper from 'material-ui/Paper';
import * as selectors from './selectors';
import {
  updateSeniority,
  updateProximity,
  removeRelation,
  setSelectedTitle,
  createRelation,
} from './actions';


export class TitlesEditor extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      selectedTitle,
      selectedTitleRelations,
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
            </H3>
            <Paper className={styles.paper} zDepth={1}>
              <div className={styles.paperWrapper}>
                <FilterParams />
                <FilterResults
                  results={this.props.results}
                  titlesTotal={this.props.titlesTotal}
                  selectedTitle={this.props.selectedTitleId}
                  relations={this.props.relations}
                  onRowSelection={this.props.setSelectedTitle}
                  onAddRelation={this.props.createRelation}
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
                  onSeniorityChange={this.props.updateSeniority}
                  onProximityChange={this.props.updateProximity}
                  onRelationRemove={this.props.removeRelation}
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
  selectedTitleRelations: selectors.selectedTitleRelations()(state),
  results: selectors.results()(state),
  titlesTotal: selectors.titlesTotal()(state),
  selectedTitleId: selectors.selectedTitleId()(state),
  relations: selectors.relations()(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  updateSeniority: (...args) => dispatch(updateSeniority(...args)),
  updateProximity: (...args) => dispatch(updateProximity(...args)), // todo: implement
  removeRelation: (...args) => dispatch(removeRelation(...args)),
  setSelectedTitle: (titleId) => dispatch(setSelectedTitle(titleId)),
  createRelation: (...args) => dispatch(createRelation(...args)),

});

export default connect(mapStateToProps, mapDispatchToProps)(TitlesEditor);
