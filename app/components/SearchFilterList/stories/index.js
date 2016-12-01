import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import SearchFilterList from '../index';

const list1 = [
  {
    name: 'AX Functional Consultant',
    location: 'Sydney',
    position: 'Manager',
    date: '4 May 2016',
    time: '21:00pm',
    relevant: 1,
    group: 'Recommended',
    id: 1,

  },
  {
    name: 'Back-end Developer',
    location: 'Canberra',
    date: '4 May 2016',
    time: '22:00pm',
    relevant: 22,
    group: 'Recommended',
    id: 2,
  },
  {
    name: 'Sitecore Lead Consultant',
    location: 'Melbourne',
    position: 'Lead',
    date: '4 May 2016',
    time: '22:00pm',
    relevant: 3,
    group: 'Recommended',
    id: 3,
  },
  {
    name: 'Front-end Developer',
    location: 'New York',
    position: 'Full-time',
    date: '3 January 2016',
    time: '14:00pm',
    relevant: 5,
    group: 'Recommended',
    id: 4,
  },
  {
    name: 'UX/UI designer',
    location: 'Amsterdam',
    position: 'Full-time',
    date: '1 August 2017',
    time: '08:00am',
    relevant: 8,
    group: 'Recommended',
    id: 5,
  },
  {
    name: 'PR manager',
    location: 'Boston',
    position: 'Full-time',
    date: '1 August 2017',
    time: '08:00am',
    relevant: 0,
    group: 'Recommended',
    id: 6,
  },
];

const list2 = [

  {
    name: 'Trader',
    location: 'Chicago',
    position: 'Full-time',
    date: '1 August 2017',
    time: '08:00am',
    relevant: 99,
    group: 'Recommended',
    id: 7,
  },
  {
    name: 'Business analyst',
    location: 'Singapore',
    position: 'Full-time',
    date: '1 August 2017',
    time: '08:00am',
    relevant: 6,
    group: 'Recommended',
    id: 8,
  },
  {
    name: 'UX/UI designer',
    location: 'Dubai',
    position: 'Full-time',
    date: '1 August 2017',
    time: '08:00am',
    relevant: 16,
    group: '',
    id: 9,
  },
  {
    name: 'JS developer',
    location: 'Moscow',
    position: 'Lead',
    date: '1 August 2017',
    time: '08:00am',
    relevant: 86,
    group: 'Recommended',
    id: 10,
  },
  {
    name: 'UX/UI designer',
    location: 'Berlin',
    position: 'Full-time',
    date: '1 August 2017',
    time: '08:00am',
    relevant: 33,
    group: '',
    id: 11,
  },
  {
    name: 'Front-end Developer',
    location: 'Paris',
    position: 'Junior',
    date: '1 August 2017',
    time: '08:00am',
    relevant: 44,
    group: '',
    id: 12,
  },
];

const groups = [
  { title: 'Group A', items: list1 },
  { title: 'Group B', items: list2 },
];

storiesOf('SearchFilterList', module)

  .add('SearchFilterList single block', () => (
    <SearchFilterList
      groups={groups}
      sortBy={['relevant', 'name']}
      filterBy="name"
      subheader="group"
      onItemSelected={action('item selected')}
    />
  ));
