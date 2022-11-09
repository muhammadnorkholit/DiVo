import {Alert, Linking} from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import GetLocation from 'react-native-get-location';
import Geolocation from 'react-native-geolocation-service';
import {API_APP_LOCAL, APP} from '../environment';
import {getData, saveData} from '../helpers/Storage';

export const voteStore = (navigation, idK) => {
  let updateUser = '';
  let idP = null;
  let latitude = null;
  let longitude = null;
  let qr = null;
  let status = 0;
  let latitudeSekolahUtara = -7.917187;
  let latitudeSekolahSelatan = -7.918862;
  let longtitudeSekolahTimur = 113.839542;
  let longtitudeSekolahBarat = 113.838063;
  let latitudeSekolahUtara2 = -7.907434;
  let latitudeSekolahSelatan2 = -7.933296;
  let longtitudeSekolahTimur2 = 113.850496;
  let longtitudeSekolahBarat2 = 113.819431;

  getData('user').then(e => {
    idP = e[0].id_peserta;
    qr = e[0].qr_code;
    getData('location').then(l => {
      latitude = l.latitude;
      longitude = l.longitude;

      if (
        latitudeSekolahUtara > l.latitude &&
        latitudeSekolahSelatan < l.latitude &&
        longtitudeSekolahBarat > l.longitude &&
        longtitudeSekolahTimur < l.longitude
      ) {
        status = 1;
      } else if (
        latitudeSekolahUtara2 > l.latitude &&
        latitudeSekolahSelatan2 < l.latitude &&
        longtitudeSekolahBarat2 < l.longitude &&
        longtitudeSekolahTimur2 > l.longitude
      ) {
        status = 2;
      } else {
        status = -1;
      }

      const data = {
        id_peserta: idP,
        id_kandidat: idK,
        qr_code: qr,
        latitude: latitude,
        longitude: longitude,
        status_tempat: status,
      };

      fetch(APP() + '/api/vote', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(success => success.json())
        .then(finish => {
          if (APP() != API_APP_LOCAL) {
            fetch(API_APP_LOCAL + '/api/vote', {
              method: 'post',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            })
              .then(success => success.json())
              .then(finish => {})
              .catch(err => {});
          }
          fetch(APP() + '/api/auth', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({qr_code: qr}),
          })
            .then(response => response.json())
            .then(json => {
              saveData({key: 'user', data: json.user});
            });

          Alert.alert(' Info Pemilihan', 'Terima kasih telah memilih kami :)', [
            {
              text: 'Cancel',
              onPress: () => {
                return false;
              },
            },
            {
              text: 'Ok',
              onPress: () => {
                return false;
              },
            },
          ]);
        })

        .catch(err => {
          Alert.alert(' Info Pemilihan', 'Gagal terhubung ke server', [
            {
              text: 'Cancel',
              onPress: () => {
                return false;
              },
            },
            {
              text: 'Ok',
              onPress: () => {
                return false;
              },
            },
          ]);
        });
    });
  });

  return false;
};

export const getStatus = (idP, idK) => {
  return fetch(APP() + `/api/status/${idP}/${idK}`)
    .then(res => res.json())
    .then(json => {
      return json;
    });
};

export const getLocation = () => {
  RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
    interval: 10000,
    fastInterval: 5000,
  })
    .then(data => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 25000,
        maximumAge: 3600000,
      })
        .then(location => {
          return false;
        })
        .catch(error => {
          return false;
        });
      Geolocation.getCurrentPosition(
        position => {
          saveData({key: 'location', data: position.coords});
        },
        error => {
          console.log(error);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
      );
    })
    .catch(err => {});
};
