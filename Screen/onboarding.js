import {Dimensions, Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import color from '../COLORS/colors';
import {saveData} from '../helpers/Storage';

function Onboard({navigation}) {
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  function onComplete() {
    saveData({key: 'status', data: 1});
    navigation.replace('index', {token: 1});
  }
  return (
    <Onboarding
      onDone={onComplete}
      onSkip={onComplete}
      pages={[
        {
          backgroundColor: color.primary,
          image: (
            <Image
              style={{width: SCREEN_WIDTH, height: 150}}
              resizeMode="contain"
              source={require('../img/logo.png')}
            />
          ),
          title: 'Digital Vote',
          subtitle:
            'Merupakan sebuah aplikasi berbasis android yang digunakan untuk penilaian lomba',
        },
        {
          backgroundColor: color.primary,
          image: (
            <Image
              style={{width: SCREEN_WIDTH, height: 250}}
              resizeMode="contain"
              source={require('../img/DIGITAL_CORONG.png')}
            />
          ),
          title: 'Digital Vote',
          subtitle: ' Aplikasi ini dapat mempermudah dalam penilaian lomba',
        },
      ]}
    />
  );
}

export default Onboard;
