import React from 'react';
import { storiesOf } from '@kadira/storybook';
import SearchFilterList from '../index';

const list = [
  {
    name: 'AX Functional Consultant',
    location: 'Sydney',
    position: 'Manager',
    date: '4 May 2016',
    time: '21:00pm',
    relevant: 1,

  },
  {
    name: 'Back-end Developer',
    location: 'Canberra',
    position: 'Full-time',
    date: '4 May 2016',
    time: '22:00pm',
    relevant: 0,
  },
  {
    name: 'Sitecore Lead Consultant',
    location: 'Melbourne',
    position: 'Lead',
    date: '4 May 2016',
    time: '22:00pm',
    relevant: 1,
  },
  {
    name: 'Front-end Developer',
    location: 'New York',
    position: 'Full-time',
    date: '3 January 2016',
    time: '14:00pm',
    relevant: 1,
  },
  {
    name: 'UX/UI designer',
    location: 'Amsterdam',
    position: 'Full-time',
    date: '1 August 2017',
    time: '08:00am',
    relevant: 1,
  },
  {
    name: 'PR manager',
    location: 'Boston',
    position: 'Full-time',
    date: '1 August 2017',
    time: '08:00am',
    relevant: 1,
  },
  {
    name: 'Trader',
    location: 'Chicago',
    position: 'Full-time',
    date: '1 August 2017',
    time: '08:00am',
    relevant: 1,
  },
  {
    name: 'Business analyst',
    location: 'Singapore',
    position: 'Full-time',
    date: '1 August 2017',
    time: '08:00am',
    relevant: 1,
  },
  {
    name: 'UX/UI designer',
    location: 'Dubai',
    position: 'Full-time',
    date: '1 August 2017',
    time: '08:00am',
    relevant: 1,
  },
  {
    name: 'JS developer',
    location: 'Moscow',
    position: 'Lead',
    date: '1 August 2017',
    time: '08:00am',
    relevant: 1,
  },
  {
    name: 'UX/UI designer',
    location: 'Berlin',
    position: 'Full-time',
    date: '1 August 2017',
    time: '08:00am',
    relevant: 1,
  },
  {
    name: 'Front-end Developer',
    location: 'Paris',
    position: 'Junior',
    date: '1 August 2017',
    time: '08:00am',
    relevant: 1,
  },

];

storiesOf('SearchFilterList', module)

  .add('SearchFilterList single block', () => (
    <SearchFilterList
      items={list}
      sortBy={['relevant', 'name']}
      filterBy="name"
    />
  ));
  /* .add('SearchFilterList multiple blocks', () => (
    <SearchFilterList
      items={[
       { title: 'block1', items: hugeList },
       { title: 'block2', items: hugeList },
       ]}
      sortBy={['relevance', 'name']}
      filterBy="name"
    />
  ));*/
