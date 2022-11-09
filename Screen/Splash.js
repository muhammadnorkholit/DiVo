import React, {useEffect, useRef} from 'react';
import {Text, View, Image, Animated, Easing, Dimensions} from 'react-native';
import Container from '../components/container';
import {getData} from '../helpers/Storage';

export default function Splash({navigation}) {
  const bounce = useRef(new Animated.Value(0)).current;
  const SCREEN_HEIGHT = Dimensions.get('screen').height;
  useEffect(() => {
    async function status() {
      const status = await getData('status');
      if (status == 1) {
        setTimeout(() => {
          navigation.replace('index', {token: 1});
        }, 2000);
      } else {
        setTimeout(() => {
          navigation.replace('onBoarding');
        }, 2000);
      }
    }
    status();
    Animated.timing(bounce, {
      useNativeDriver: true,
      easing: Easing.bounce,
      toValue: (SCREEN_HEIGHT - 320) / 2,
      duration: 1000,
    }).start();
  }, []);

  const translateY = {
    translateY: bounce,
  };

  return (
    <Container padding={true}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 40,
                alignSelf: 'center',
                color: 'white',
                // transform: [{translateY: -100}],
              }}>
              KETOSIN
            </Text>
          </View>
          <Animated.View
            style={{justifyContent: 'space-between', transform: [translateY]}}>
            <Animated.Image
              resizeMode={'contain'}
              source={require('./../img/logo.png')}
              style={{width: 220, height: 220}}
            />
          </Animated.View>
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 22,
            alignSelf: 'center',
            color: 'white',
          }}>
          SMKN 1 BONDOWOSO
        </Text>
      </View>
    </Container>
  );
}
