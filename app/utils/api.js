import * as _ from 'lodash';

export function parseMlabIds(responseAr) {
  return responseAr.map(item => {
    return {
      _id: item._id.$oid,
      ..._.omit(item, '_id'),
    };
  });
}
