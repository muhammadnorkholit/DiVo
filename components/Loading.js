import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

export default function Loading({visible, text}) {
  return (
    <AnimatedLoader  visible={visible} animationStyle={styles.lottie} speed={1}>
      <Text style={{color: 'white', fontSize: 20}}>{text}</Text>
    </AnimatedLoader>
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
