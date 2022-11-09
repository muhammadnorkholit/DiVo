export const API_APP = 'https://digitalvote.thecapz.com';
export const API_APP_LOCAL = 'http://192.168.1.130:2022';

let baseURL = API_APP;
export function APP() {
  fetch(API_APP)
    .then(e => {
      baseURL = API_APP;
    })
    .catch(err => {
      baseURL = API_APP_LOCAL;
    });

  return baseURL;
}
