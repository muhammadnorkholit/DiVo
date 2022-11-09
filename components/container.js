import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {ScrollView, Dimensions} from 'react-native';
import color from '../COLORS/colors';

export default function Container({children, padding}) {
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const SCREEN_WIDTH = Dimensions.get('window').width;
  return (
    <LinearGradient
      locations={[0.6, 1  ]}
      // colors={['#6799E8', '#4B4AF9', '#882AE8']}
      colors={[color.primary, color.second]}
      style={{
        flex: 1,
        width: SCREEN_WIDTH,
        padding: padding ? 19 : 0,
      }}>
      {/* <ScrollView style={{ flex: 1, padding: 19 }}> */}
      {children}
      {/* </ScrollView> */}
    </LinearGradient>
  );
}
