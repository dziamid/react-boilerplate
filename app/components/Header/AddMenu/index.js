import React from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const AddMenu = (props) => (
  <Menu {...props}>
    <MenuItem primaryText="Add New Company" />
    <MenuItem primaryText="Add New Job Opening" />
    <MenuItem primaryText="Add New Add" />
    <MenuItem primaryText="Add New Candidate" />
    <MenuItem primaryText="Add New Task" />
  </Menu>
);

export default AddMenu;
