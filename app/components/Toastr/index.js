import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';

class Toastr extends Component {

  render() {
    const { activeToast } = this.props;

    return (
      <div>
        <Snackbar
          open={activeToast !== null}
          message={activeToast ? activeToast.message : ''}
          autoHideDuration={0}
          action="undo"
        />
      </div>
    );
  }

}


const mapStateToProps = (state) => ({
  activeToast: state.getIn(['toastr', 'activeToast']),
});

export default connect(mapStateToProps, null)(Toastr);
