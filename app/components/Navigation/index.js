import React from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import OverviewIcon from 'material-ui/svg-icons/image/remove-red-eye';
import JobsIcon from 'material-ui/svg-icons/action/work';
import CandidateIcon from 'material-ui/svg-icons/social/people';
import CalendarIcon from 'material-ui/svg-icons/action/date-range';
import ReportsIcon from 'material-ui/svg-icons/editor/insert-chart';

const Navigation = (props) => (
  <Menu disableAutoFocus {...props}>
    <MenuItem primaryText="Overview" leftIcon={<OverviewIcon />} />
    <MenuItem primaryText="Jobs" leftIcon={<JobsIcon />} />
    <MenuItem primaryText="Candidate" leftIcon={<CandidateIcon />} />
    <MenuItem primaryText="Calendar" leftIcon={<CalendarIcon />} />
    <MenuItem primaryText="Reports" leftIcon={<ReportsIcon />} />
  </Menu>
);

export default Navigation;
