'use strict';

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {checkScan} from '../Controllers/ScanController';
import Loading from '../components/Loading';
import Container from '../components/container';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
function Scan({navigation}) {
  const [visible, setVisible] = useState(false);
  const [flash, setFlash] = useState(false);

  const onSuccess = e => {
    setVisible(true);
    if (e.data) {
      checkScan({navigation, data: e.data}).then(e => {
        setTimeout(() => {
          setVisible(e);
        }, 3000);
      });
    } else {
      setVisible(false);
    }
  };

  const withFull = SCREEN_WIDTH / 1.5;
  return (
    <QRCodeScanner
      reactivate={false}
      showMarker={true}
      markerStyle={{
        borderColor: 'white',
        backgroundColor: 'transparent',
        borderRadius: 30,
      }}
      cameraContainerStyle={{backgroundColor: 'black'}}
      cameraStyle={{height: SCREEN_HEIGHT}}
      onRead={onSuccess}
      customMarker={
        visible ? (
          <Container padding={true}>
            <Loading visible={visible} text={'Scanning...'} />
          </Container>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                position: 'absolute',
                top: SCREEN_HEIGHT / 6,
                backgroundColor: '#00000075',
                width: SCREEN_WIDTH / 1.3,
                padding: 20,
                borderRadius: 15,
                zIndex: 9999999,
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                }}>
                SCAN QR CODE
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: (SCREEN_HEIGHT - SCREEN_WIDTH / 1.5) / 2,
                backgroundColor: '#03030373',
                position: 'absolute',
                top: 0,
              }}
            />
            <View
              style={{
                width: '100%',
                height: (SCREEN_HEIGHT - withFull) / 2,
                backgroundColor: '#03030373',
                position: 'absolute',
                bottom: 0,
              }}
            />
            <View
              style={{
                width: (SCREEN_WIDTH - withFull) / 2,
                height: withFull,
                backgroundColor: '#03030373',
                position: 'absolute',
                right: -(SCREEN_WIDTH - withFull) / 2,
              }}
            />
            <View
              style={{
                width: (SCREEN_WIDTH - SCREEN_WIDTH / 1.5) / 2,
                height: SCREEN_WIDTH / 1.5,
                backgroundColor: '#03030373',
                position: 'absolute',
                left: -(SCREEN_WIDTH - SCREEN_WIDTH / 1.5) / 2,
              }}
            />
            <View
              style={{
                width: withFull,
                height: withFull,
                position: 'relative',
                borderWidth: 2,
                borderColor: '#ffffff4d',
              }}>
              <View
                style={{
                  position: 'absolute',
                  top: -2,
                  left: -2,
                  height: 30,
                  width: 30,
                  borderTopWidth: 4,
                  borderLeftWidth: 4,
                  borderColor: 'white',
                }}></View>
              <View
                style={{
                  position: 'absolute',
                  top: -2,
                  right: -2,
                  height: 30,
                  width: 30,
                  borderTopWidth: 4,
                  borderRightWidth: 4,
                  borderColor: 'white',
                }}></View>
              <View
                style={{
                  position: 'absolute',
                  bottom: -2,
                  left: -2,
                  height: 30,
                  width: 30,
                  borderBottomWidth: 4,
                  borderLeftWidth: 4,
                  borderColor: 'white',
                }}></View>
              <View
                style={{
                  position: 'absolute',
                  bottom: -2,
                  right: -2,
                  height: 30,
                  width: 30,
                  borderBottomWidth: 4,
                  borderRightWidth: 4,
                  borderColor: 'white',
                }}></View>
            </View>
          </View>
        )
      }
      flashMode={
        flash
          ? RNCamera.Constants.FlashMode.torch
          : RNCamera.Constants.FlashMode.off
      }
    />
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  lottie: {
    width: 100,
    height: 100,
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default Scan;
