import {Alert} from 'react-native';
import {API_APP, APP} from '../environment';
import {saveData} from '../helpers/Storage';
import {getHasil} from './HasilController';
import {CommonActions} from '@react-navigation/native';
import {showKandidat} from './KandidatController';

export function checkScan({navigation, data}) {
  return fetch(APP() + '/api/auth', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({qr_code: data}),
  })
    .then(response => response.json())
    .then(json => {
      if (json.status == 'finish') {
        navigation.replace('index');
        Alert.alert('Pemberitahuan', json.msg);
        return false;
      } else if (json.status == 'start') {
        navigation.replace('index');
        Alert.alert('Pemberitahuan', json.msg);
        return false;
      } else if (json.status == 'success') {
        saveData({key: 'user', data: json.user});
        getHasil().then(data => {
          saveData({key: 'hasil', data: data.data});
        });
        showKandidat().then(kandidat => {
          saveData({key: 'kandidat', data: kandidat});
        });
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'KETOSIN'}],
          }),
        );
        return false;
      } else {
        navigation.replace('index');
        Alert.alert('Pemberitahuan', json.msg);
        return false;
      }
    })
    .catch(error => {
      Alert.alert('Pemberitahuan', 'Telepon tidak terhubung ke internet');
      navigation.replace('index');
    });
}
