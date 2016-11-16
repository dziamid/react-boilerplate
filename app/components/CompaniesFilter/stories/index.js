import React from 'react';
import { storiesOf } from '@kadira/storybook';
import CompaniesFilter from '../index';

import companies from 'components/common/stories/companies'; // todo: rename stories to mocks

storiesOf('CompaniesFilter', module)
  .add('open', () => (
    <CompaniesFilter companies={companies} />
  ));
