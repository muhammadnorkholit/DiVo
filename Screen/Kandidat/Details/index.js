import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import RenderHTML from 'react-native-render-html';
import Container from '../../../components/container';
import Loading from '../../../components/Loading';
import {showKandidatDetail} from '../../../Controllers/KandidatController';
import {getLocation, getStatus, voteStore} from '../../../Controllers/Vote';
import {API_APP, APP} from '../../../environment';
import {getData} from '../../../helpers/Storage';
export default function Detail({navigation, route}) {
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const [kandidat, setKandidat] = useState([]);
  const [Visible, setVisible] = useState(true);
  const [user, setUser] = useState({});
  const [Status, setStatus] = useState(100);
  const [clicked, setclicked] = useState(false);
  useEffect(() => {
    getLocation();
    async function tests() {
      const data2 = await getData('kandidat');
      data2.data.filter(e => {
        if (e.id_kandidat == route.params.id) {
          setKandidat(e);
        }
      });
      const data = await showKandidatDetail(route.params.id, navigation);
      const user = await getData('user');
      const statusUser = await getStatus(user[0].id_peserta, route.params.id);
      setKandidat(data.data);
      setUser(user[0]);
      setStatus(statusUser.status);
      if (statusUser) {
        setVisible(false);
      }
      setVisible;
    }
    tests();
  }, []);

  const confirm = () => {
    setclicked(true);
    Alert.alert(' Info Pemilihan', 'Apakah anda yakin memilih paslon ini ?', [
      {
        text: 'Cancel',
        onPress: () => {
          setclicked(true);
          return false;
        },
      },
      {
        text: 'Ok',
        onPress: () => {
          setStatus(1);
          voteStore(navigation, kandidat?.id_kandidat, user);

          return false;
        },
      },
    ]);
  };

  // let loop = 1;
  // if (user.status_peserta == 'sudah memilih' && loop == 1) {
  //   loop++;
  //   console.log(Status);
  //   Alert.alert(' Info Pemilihan', 'Terima kasih anda sudah memilih', [
  //     {
  //       text: 'Ok',
  //       onPress: () => {
  //         voteStore(navigation, kandidat?.id_kandidat, user);
  //         return false;
  //       },
  //     },
  //   ]);
  // }

  return (
    <Container padding={false}>
      <LinearGradient
        // colors={['#6799E8', '#4B4AF9', '#882AE8']}
        colors={['#6799E8', '#4B4AF9', '#882AE8']}
        style={{
          display: Visible ? 'flex' : 'none',
          flex: 1,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          position: 'absolute',
          zIndex: 9,
        }}>
        <Loading visible={Visible} text={'Memuat...'} />
      </LinearGradient>
      <ScrollView>
        <View style={{flex: 1}}>
          <Image
            resizeMode="cover"
            style={{
              justifyContent: 'space-between',
              backgroundColor: 'white',
              minHeight: 250,
              borderRadius: 2,
              alignkandidats: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              position: 'relative',
            }}
            source={{
              uri: APP() + '/images/' + kandidat?.foto,
            }}
          />
          <View
            style={{
              zIndex: 999,
              flexDirection: 'row',
              padding: 20,
              alignItems: 'center',
              width: SCREEN_WIDTH,
            }}>
            <View style={{width: '100%', padding: 10}}>
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 30,
                    fontWeight: 'bold',
                  }}>
                  {kandidat?.nama_ketua}
                </Text>

                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                    }}></Text>
                </View>
                <TouchableOpacity
                  disabled={Status == 0 ? false : true}
                  onPress={confirm}
                  style={{
                    backgroundColor: 'white',
                    padding: 10,
                    marginTop: 8,
                    borderRadius: 5,
                    opacity: Status == 0 ? 1 : 0.8,
                  }}>
                  <Text
                    style={{
                      color: '#5F6FF6',
                      fontSize: 15,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    {Status == 1
                      ? ' Terima kasih :)'
                      : Status == 2
                      ? 'Terima Kasih :('
                      : Status == 0
                      ? 'Pilih Kami'
                      : 'Terima kasih'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{padding: 19}}>
            <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>
              "{kandidat?.slogan}"
            </Text>
            <View style={{marginTop: 20}}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{color: 'black', fontSize: 19, fontWeight: 'bold'}}>
                  Visi :
                </Text>
                <RenderHTML
                  baseStyle={{color: 'black'}}
                  contentWidth={200}
                  source={{
                    html: kandidat?.visi
                      ? kandidat?.visi
                      : '<h4>Loading...</h4>',
                  }}
                />
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 10,
                  marginTop: 20,
                  borderRadius: 10,
                }}>
                <Text
                  style={{color: 'black', fontSize: 19, fontWeight: 'bold'}}>
                  Misi :
                </Text>
                <RenderHTML
                  baseStyle={{color: 'black'}}
                  contentWidth={200}
                  source={{
                    html: kandidat?.misi
                      ? kandidat?.misi
                      : '<h4>Loading...</h4>',
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
