import React, {useState, useRef, useEffect} from 'react';
import {
  Dimensions,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {checkScan} from '../Controllers/ScanController';
import Container from '../components/container';

import {getLocation} from '../Controllers/Vote';
import LinearGradient from 'react-native-linear-gradient';
import Loading from '../components/Loading';
import color from '../COLORS/colors';
// import {Gesture}
export default function Index({navigation, route}) {
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  // const [top, setTop] = useState(510);
  const [msg, setMsg] = useState(true);
  const [QRCode, setQRCode] = useState(null);
  const [swap, setSwap] = useState(false);
  const [Active, setActive] = useState(false);
  const [Visible, setVisible] = useState(false);

  // const setSwap = () => {};
  const handleSwap = useRef(new Animated.Value(0)).current;
  const bgOpacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;
  const animation = useRef(new Animated.Value(0)).current;
  const test = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    getLocation();
    Animated.timing(handleSwap, {
      duration: 500,
      delay: 100,
      useNativeDriver: true,
      toValue: swap ? -250 : 0,
      // easing: Easing.bounce,
    }).start();
    Animated.timing(bgOpacity, {
      duration: 1000,
      delay: 100,
      useNativeDriver: true,
      toValue: swap ? 1 : 0,
      // easing: Easing.bounce,
    }).start();
    Animated.timing(scale, {
      duration: 400,
      useNativeDriver: true,
      toValue: Active ? 1 : 0,
    }).start();
    Animated.timing(animation, {
      duration: 400,
      useNativeDriver: true,
      toValue: Active ? 10 : 0,
    }).start();

    Animated.timing(test, {
      duration: 600,
      useNativeDriver: false,
      toValue: swap ? 50 : 0,
    }).start();

    if (swap) {
      setTimeout(() => {
        setActive(true);
      }, 150);
    } else {
      setTimeout(() => {
        setActive(false);
      }, 400);
    }
  }, [swap]);
  if (route.params?.token && msg) {
    setMsg(false);
    setTimeout(() => {
      Alert.alert(
        'Pemberitahuan',
        'Pastikan internet stabil saat menggunakan ketosin',
        [
          {
            Text: 'Ok',
            onPress: () => {},
          },
        ],
      );
    }, 200);
  }

  const submit = () => {
    if (QRCode == null) {
      Alert.alert('Info Masuk', 'qr code belom terisi');
    } else {
      setVisible(true);
      checkScan({navigation: navigation, data: QRCode});
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container padding={false}>
          <LinearGradient
            colors={['#6799E8', '#4B4AF9', '#882AE8']}
            style={{
              display: Visible ? 'flex' : 'none',
              flex: 1,
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
              position: 'absolute',
              zIndex: 9,
            }}>
            <Loading visible={Visible} text={'Autenticate...'} />
          </LinearGradient>
          <View>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 40,
                marginVertical: 10,
                fontWeight: 'bold',
                marginTop: 50,
              }}>
              Digital Voting
            </Text>

            <View style={{alignItems: 'center', marginTop: 20}}>
              <Image
                resizeMode="contain"
                style={{width: 200, height: 200}}
                source={require('./../img/DIGITAL_CORONG.png')}
              />
            </View>

            <Animated.View
              style={{
                position: 'absolute',
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT,
                backgroundColor: test.interpolate({
                  inputRange: [0, 50],
                  outputRange: ['transparent', '#202124ad'],
                  easing: Animated.Easing,
                }),
                // display: (test.Value = 90 ? 'flex ' : 'none'),
              }}>
              <Animated.View
                style={{
                  backgroundColor: 'white',
                  position: 'absolute',
                  height: SCREEN_HEIGHT,
                  width: SCREEN_WIDTH,
                  right: 0,
                  left: 0,
                  top: SCREEN_HEIGHT - SCREEN_HEIGHT / 3,
                  transform: [{translateY: handleSwap}],
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  elevation: 9,
                }}>
                <View
                  style={{
                    position: 'relative',
                    height: 50,
                  }}>
                  <View
                    style={{
                      height: 7,
                      backgroundColor: 'lightgray',
                      width: '25%',
                      alignSelf: 'center',
                      position: 'absolute',
                      top: '50%',
                      zIndex: 9999,
                      borderRadius: 100,
                    }}
                  />
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    onScroll={e => {
                      if (e.nativeEvent.contentOffset.y > 0) {
                        setSwap(true);
                      } else if (e.nativeEvent.contentOffset.y <= 0) {
                        setSwap(false);
                      }
                    }}>
                    <View style={{height: 61}}></View>
                  </ScrollView>
                </View>

                <Animated.View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 3,
                    width: '100%',
                    height: test.interpolate({
                      inputRange: [0, 50],
                      outputRange: [500, 0],
                    }),
                    opacity: test.interpolate({
                      inputRange: [0, 50],
                      outputRange: [1, 0],
                      easing: Animated.Easing,
                    }),
                    paddingVertical: test.interpolate({
                      inputRange: [0, 50],
                      outputRange: [0, 0],
                    }),
                    paddingHorizontal: 14,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 21,
                    }}>
                    PENGGUNAAN SCAN
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 18,
                      marginTop: 10,
                    }}>
                    Gunakan kamera dan scan QRcode untuk masuk
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.push('scan')}
                    style={{
                      backgroundColor: color.primary,
                      padding: 10,
                      borderRadius: 30,
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      Mulai Scan
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    style={{
                      color: 'black',
                      padding: 10,
                      alignItems: 'center',
                      // display: !swap ? 'flex' : 'none',
                      // flex: 1,
                      marginTop: 20,
                      // justifyContent: 'flex-end',
                    }}
                    onPress={() => {
                      setSwap(!swap);
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        // backgroundColor: color.primary,
                        paddingHorizontal: 14,
                        color: 'gray',
                        fontSize: 12,
                        borderRadius: 10,
                        paddingVertical: 5,
                      }}>
                      OPSI LAIN
                    </Text>
                  </TouchableOpacity> */}
                </Animated.View>

                <Animated.View>
                  <Animated.View
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 3,
                      width: '100%',
                      minHeight: 180,
                      height: 'auto',
                      padding: 14,
                      height: test.interpolate({
                        inputRange: [0, 50],
                        outputRange: [0, 180],
                      }),
                      // flex: 1,
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 21,
                      }}>
                      MASUK MANUAL
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 18,
                        marginTop: 10,
                      }}>
                      Masukkan Qr code secara manual
                    </Text>

                    <View style={{marginBottom: 10}}>
                      <TextInput
                        onChangeText={text => setQRCode(text)}
                        placeholder="QR CODE"
                        placeholderTextColor={'black'}
                        style={{
                          borderBottomColor: 'gray',
                          borderBottomWidth: 1,
                          padding: 0,
                          paddingHorizontal: 5,
                          paddingTop: 10,
                          color: 'black',
                          backgroundColor: 'white',
                        }}
                      />
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => submit()}
                        style={{
                          backgroundColor: color.primary,
                          padding: 10,
                          borderRadius: 30,
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: 'bold',
                            textAlign: 'center',
                          }}>
                          Masuk
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                  <Animated.View
                    style={{
                      // backgroundColor: 'white',
                      borderRadius: 3,
                      width: '100%',
                      minHeight: 150,
                      // marginTop: 10,
                      padding: 14,
                      // borderTopRightRadius: 100,
                      // position: 'absolute',
                      // flex: 1,
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 21,
                      }}>
                      PENGGUNAAN SCAN
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 18,
                        marginTop: 10,
                        marginBottom: 10,
                      }}>
                      Gunakan kamera dan scan QRcode untuk masuk
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.push('scan')}
                      style={{
                        backgroundColor: color.primary,
                        padding: 10,
                        borderRadius: 30,
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 18,
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}>
                        Mulai Scan
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                  <View style={{height: 30, marginTop: 30}}>
                    <Text
                      style={{
                        color: color.primary,
                        textAlign: 'center',
                        fontSize: 19,
                        fontWeight: 'bold',
                      }}>
                      Digital Voting
                    </Text>
                  </View>
                </Animated.View>
              </Animated.View>
            </Animated.View>
          </View>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});
