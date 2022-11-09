import React from 'react';
import {Image} from 'react-native';
import {ScrollView} from 'react-native';
import {StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import Container from '../components/container';

export default function Tentang() {
  return (
    <Container padding={false}>
      <ScrollView style={{padding: 19}}>
        <View>
          <View
            style={{
              marginBottom: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              source={require('./../img/logo.png')}
              style={{width: 170, height: 170}}
            />
          </View>
          <View>
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                minHeight: 100,
                borderRadius: 4,
                padding: 15,
                marginBottom: 20,
              }}>
              <Text
                style={{
                  fontSize: 17,
                  textAlign: 'left',
                  letterSpacing: 0.3,
                  marginBottom: 10,
                  color: '#303030',
                }}>
                Ketosin adalah sebuah aplikasi yang memiliki basis android yang
                digunakan dalam proses pemilihan ketua osis masa jabatan baru
                memanfaatkan teknologi smartphone.
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  textAlign: 'left',
                  letterSpacing: 0.3,
                  color: '#303030',
                }}>
                Diharapkan aplikasi ini dapat menghemat biaya ,waktu, dan tenaga
                pada saat proses pelaksanaan pemilihan
              </Text>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                minHeight: 100,
                borderRadius: 4,
                padding: 15,
              }}>
              <Text style={styles.text}>
                {'-> ORIGINAL Idea by RPL 6th Generation'}
              </Text>
              <Text style={styles.text}>
                {'-> Developed by RPL 7th Generation'}
              </Text>
              <Text style={styles.text}>
                {'-> Re-Developed by RPL 8th, 9th, 10th Generation'}
              </Text>
              <Text style={styles.text}>
                {'-> Re-Build to Android 10 and 11 by RPL 11th Generation'}
              </Text>
              <Text style={styles.text}>
                {'-> Re-Build By RPL  12th Generation'}
              </Text>
            </View>
          </View>
          <View style={{height: 30, marginTop: 20, flex: 1}}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 19,
                fontWeight: 'bold',
              }}>
              Ketosin 3.0.2
            </Text>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    textAlign: 'left',
    letterSpacing: 0.3,
    marginBottom: 3,
    color: '#303030',
  },
});
