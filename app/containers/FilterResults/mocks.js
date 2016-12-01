import { getRandomInt } from '../../utils/mathUtils';

export function getResults() {
  const num = getRandomInt(1, 10);

  const data =
    [
    { jobTitle: 'web dev', seniority: 2, relations: 4 },
    { jobTitle: 'html dev', seniority: 1, relations: 2 },
    { jobTitle: 'dev manager', seniority: 5, relations: 6 },
    { jobTitle: 'IT guy', seniority: 2, relations: 1 },
    { jobTitle: 'web dev', seniority: 2, relations: 4 },
    { jobTitle: 'html dev', seniority: 1, relations: 2 },
    { jobTitle: 'dev manager', seniority: 5, relations: 6 },
    { jobTitle: 'IT guy', seniority: 2, relations: 1 },
    ];

  return data.splice(0, num);
}

