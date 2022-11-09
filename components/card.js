import React from 'react';

export default function Card() {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 3,
        width: '100%',
        minHeight: 150,
        marginTop: 20,
        padding: 14,
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
        }}>
        Gunakan kamera dan scan QRcode untuk masuk
      </Text>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <TouchableOpacity
          onPress={() => navigation.push('scan')}
          style={{backgroundColor: 'purple', padding: 10}}>
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
      </View>
    </View>
  );
}
