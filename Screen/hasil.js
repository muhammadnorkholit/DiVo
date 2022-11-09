import React, {useState, useEffect} from 'react';
import {Animated} from 'react-native';
import {View, Dimensions, Text, ScrollView} from 'react-native';

import {
  VictoryBar,
  VictoryLabel,
  VictoryPie,
  VictoryChart,
  VictoryTheme,
} from 'victory-native';
import Container from '../components/container';
// import Chart from 'react-native-chartjs';
import {getHasil} from '../Controllers/HasilController';
import {getData, saveData} from '../helpers/Storage';
export default function Hasil() {
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_HEIGHT = Dimensions.get('window').height;

  const [Hasil, setHasil] = useState([]);
  const [percent, setpercent] = useState({});
  const nama = [];
  const persen = [];
  useEffect(() => {
    getData('hasil').then(data => setHasil(data));
    getData('persen').then(data => setpercent(data));
    getHasil().then(data => {
      setHasil(data.data);
      setpercent(data);
      saveData({key: 'persen', data: data});
      saveData({key: 'hasil', data: data?.data});
    });
  }, []);

  for (let i = 0; i < Hasil?.length; i++) {
    nama.push(
      'PASLON ' +
        (i + 1) +
        `
    
        ` +
        Hasil[i]?.persen +
        '%',
    );
    persen.push(Hasil[i]?.persen);
  }

  return (
    <Container padding={false}>
      <ScrollView nestedScrollEnabled>
        <Animated.View style={{justifyContent: 'center'}}>
          <VictoryPie
            scale={{x: 'linear', y: 'log'}}
            theme={VictoryTheme.material}
            colorScale={['#6799E8', '#4B4AF9', '#882AE8']}
            standalone={true}
            width={SCREEN_WIDTH}
            startAngle={-90}
            endAngle={270}
            data={persen}
            innerRadius={40}
            labelRadius={80}
            labels={nama}
            style={{
              labels: {
                fontSize: 12,
                width: 50,
                fill: 'white',
                fontWeight: 'bold',
              },
            }}
          />
          <View>
            <Text style={{fontSize: 20, textAlign: 'center', color: 'white'}}>
              {percent?.percent + `%`} dari {percent?.peserta} pemilih
            </Text>
          </View>
        </Animated.View>
        <View style={{marginTop: 20, padding: 19}}>
          {Hasil?.map((item, index) => (
            <View
              key={index}
              style={{
                // width: SCREEN_WIDTH - 19,
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
                marginBottom: 20,
              }}>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 19,
                    textAlign: 'center',
                    marginBottom: 10,
                  }}>
                  Paslon {index + 1}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 17,
                    textTransform: 'capitalize',
                  }}>
                  {item?.nama}
                </Text>
              </View>
              <View>
                <Text style={{color: 'black', textTransform: 'capitalize'}}>
                  total pemilih {item?.suara}
                </Text>
              </View>
              <View>
                <Text style={{color: 'black', textTransform: 'capitalize'}}>
                  persentase {item?.persen} %
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </Container>
  );
}
