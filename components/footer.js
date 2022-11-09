import React from 'react';
import {View, Text} from 'react-native';

export default function Footer() {
  return (
    <View
      style={{
        height: 30,
        marginTop: 20,
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 10,
      }}>
      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontSize: 19,
          fontWeight: 'bold',
        }}>
        Digital Vote
      </Text>
    </View>
  );
}
