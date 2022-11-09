import React, {useState, useEffect} from 'react';
import {Alert, Image, ScrollView} from 'react-native';
import {Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import Container from '../components/container';
import {getData, saveData} from '../helpers/Storage';
import {API_APP} from '../environment';
import {Dimensions} from 'react-native';
import {getHasil} from '../Controllers/HasilController';
import Footer from '../components/footer';
import color from '../COLORS/colors';

export default function Home({navigation, route}) {
  const [user, setUser] = useState({});
  if (route.params?.screen) {
    navigation.push('Hasil');
  }

  const SCREEN_HEIGHT = Dimensions.get('window').height;

  const logout = () => {
    // Alert.alert('Pemberitahuan', 'Yakin ingin keluar ?');
    Alert.alert('Pemberitahuan', 'Apakah anda yakin untuk keluar ?', [
      {
        text: 'batal',
        onPress: () => false,
        style: 'cancel',
      },
      {
        text: 'ok',
        onPress: () => navigation.replace('index'),
        style: 'cancel',
      },
    ]);
  };

  useEffect(() => {
    async function tests() {
      const data = await getData('user');
      setUser(data[0]);
    }
    tests();
  }, []);

  let click = 0;
  const hasilHandle = () => {
    click++;
    if (click == 2) {
      Alert.alert('Pemberitahuan', 'Coming Soon :)', [
        {
          text: 'batal',
          onPress: () => {
            click = 0;
          },

          style: 'cancel',
        },
        {
          text: 'ok',
          onPress: () => {
            click = 0;
            return false;
          },
          style: 'cancel',
        },
      ]);
    }
  };
  return (
    <Container
      padding={true}
      style={{backgroundColor: 'white', paddingHorizontal: 13, paddingTop: 10}}>
      <View>
        <ImageBackground
          source={require('./../img/background.png')}
          resizeMode={'cover'}
          style={{
            padding: 20,
            minHeight: SCREEN_HEIGHT / 3 + 40,
            borderRadius: 10,
            backgroundColor: 'white',
          }}>
          {/* <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <Text
              style={{
                color: color.primary,
                fontSize: 17,
                fontWeight: 'bold',
              }}>
              HALO, {user.nama_peserta}
            </Text>
          </View> */}

          <View style={{alignItems: 'center', marginTop: 30}}>
            <Image
              resizeMode="contain"
              source={require('./../img/DIGITAL_CORONG.png')}
              style={{width: 200, height: 200}}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: color.primary,
                fontSize: 30,
                fontWeight: 'bold',
              }}>
              {/* KETOSIN */}
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View
        style={{
          flex: 1,
          marginTop: 20,
          width: '100%',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            // justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: 'white',
              borderRadius: 2,
              height: 180,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}
            onPress={() => navigation.push('Poster')}>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: color.primary,
                  borderRadius: 1000,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  marginBottom: 5,
                }}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('./../img/kandidat.png')}
                />
              </View>
              <Text
                style={{
                  color: color.primary,
                  fontSize: 17,
                  fontWeight: 'bold',
                }}>
                Poster
              </Text>
              <Text
                style={{
                  color: color.primary,
                  fontSize: 13,
                  fontWeight: 'semibold',
                }}>
                karya
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{flex: 0.2}}></View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              marginTop: 10,
              backgroundColor: 'white',
              borderRadius: 2,
              height: 150,

              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}
            onPress={() => navigation.push('Tentang')}>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: color.primary,
                  borderRadius: 1000,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  marginBottom: 5,
                }}>
                <Image
                  resizeMode="contain"
                  style={{width: 10, height: 50}}
                  source={require('./../img/tentang.png')}
                />
              </View>
              <Text
                style={{
                  color: color.primary,
                  fontSize: 17,
                  fontWeight: 'bold',
                }}>
                Tentang
              </Text>
              <Text
                style={{
                  color: color.primary,
                  fontSize: 13,
                  fontWeight: 'semibold',
                }}>
                Tentang Aplikasi
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.09}} />

        <View
          style={{
            // marginTop: 13,
            flex: 1,
            // justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: 'white',
              borderRadius: 2,
              height: 150,

              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}
            onPress={hasilHandle}>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: color.primary,
                  borderRadius: 1000,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  marginBottom: 5,
                }}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('./../img/hasil.png')}
                />
              </View>
              <Text
                style={{
                  color: color.primary,
                  fontSize: 17,
                  fontWeight: 'bold',
                }}>
                Hasil
              </Text>
              <Text
                style={{
                  color: color.primary,
                  fontSize: 13,
                  fontWeight: 'semibold',
                }}>
                Hasil Pemilihan
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{flex: 0.2}}></View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              marginTop: 10,
              backgroundColor: 'white',
              borderRadius: 2,
              height: 180,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}
            onPress={() => logout()}>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: color.primary,
                  borderRadius: 1000,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  marginBottom: 5,
                }}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('./../img/logout.png')}
                />
              </View>
              <Text
                style={{
                  color: color.primary,
                  fontSize: 17,
                  fontWeight: 'bold',
                }}>
                Logout
              </Text>
              <Text
                style={{
                  color: color.primary,
                  fontSize: 13,
                  fontWeight: 'semibold',
                }}>
                Keluar Aplikasi
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </Container>
  );
}
