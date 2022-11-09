import {APP} from '../environment';

export const getHasil = () => {
  return fetch(APP() + '/api/result')
    .then(res => res.json())
    .then(json => {
      return json;
    })
    .catch(err => {
      return false;
    });
};
