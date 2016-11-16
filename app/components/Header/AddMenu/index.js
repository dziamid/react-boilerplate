import React from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AddIcon from 'material-ui/svg-icons/content/add';

const innerDivStyle = {
  padding: '0 16px 0 54px',
};
const itemProps = {
  innerDivStyle,
  leftIcon: <AddIcon />,
};

const AddMenu = (props) => (
  <Menu {...props}>
    <MenuItem {...itemProps} primaryText="Add New Company" />
    <MenuItem {...itemProps} primaryText="Add New Job Opening" />
    <MenuItem {...itemProps} primaryText="Add New Add" />
    <MenuItem {...itemProps} primaryText="Add New Candidate" />
    <MenuItem {...itemProps} primaryText="Add New Task" />
  </Menu>
);

export default AddMenu;
