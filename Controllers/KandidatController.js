import {Alert} from 'react-native';
import {APP} from '../environment';
import {saveData} from '../helpers/Storage';

export function showKandidat(navigation) {
  return fetch(APP() + '/api/kandidat')
    .then(res => res.json())
    .then(json => {
      let hasil = [];
      saveData({key: 'kandidat', data: json});
      for (let i = 0; i < json.length; i++) {
        hasil.push(json);
      }
      // saveData({key: 'hasil', data: hasil});

      return json;
    })
    .catch(err => {
      return false;
    });
}
export function showKandidatDetail(id, navigation) {
  return fetch(APP() + '/api/kandidat/' + id)
    .then(res => res.json())
    .then(json => {
      return json;
    })
    .catch(err => {
      // Alert.alert('Pemberitahuan', 'Telepon tidak terhubung ke internet', [
      //   {
      //     text: 'Cancel',
      //     onPress: () => {
      //       return navigation.goBack();
      //     },
      //   },
      //   {
      //     text: 'Refresh',
      //     onPress: () => {
      //       return navigation.replace('Kandidat');
      //     },
      //   },
      // ]);
      return false;
    });
}
