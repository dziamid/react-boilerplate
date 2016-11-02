import React, { Component } from 'react';

import { default as MUIMenuItem } from 'material-ui/MenuItem';

export default class MenuItem extends Component {
  render() {
    return (
      <MUIMenuItem {...this.props} />
    );
  }
}

MenuItem.displayName = 'MenuItem';
