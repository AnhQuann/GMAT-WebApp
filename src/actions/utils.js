import _ from 'lodash';

export function checkFields(obj, paths) {
  return paths.reduce((currentCheck, path) => {
    return _.get(obj, path) && currentCheck;
  }, true);
}