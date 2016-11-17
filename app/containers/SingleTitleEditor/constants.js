/*
 *
 * SingleTitle constants
 *
 */

import * as _ from 'lodash';

export const UPDATE_TITLE = 'app/SingleTitle/UPDATE_TITLE';

export const seniorities = [
  { name: 'Senior Management', value: 1 },
  { name: 'Middle Management', value: 2 },
  { name: 'Managers and Senior Technical Professionals', value: 3 },
  { name: 'Experienced/Intermediate Level', value: 4 },
  { name: 'Entry/Junior Level', value: 5 },
];
export const proximities = [
  { name: 'Identical', value: 1 },
  { name: 'Very close', value: 2 },
  { name: 'Similar', value: 3 },
  { name: 'Not Similar', value: 4 },
  { name: 'Different', value: 5 },
];

// Getters
export function getSeniorityName(value) {
  return (_.find(seniorities, { value }) || {}).name;
}
// export function getProximityName = value => _.find(proximities, {value: value});
