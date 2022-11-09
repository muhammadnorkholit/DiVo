import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveData = async ({key, data}) => {
  const dataJson = JSON.stringify(data);
  await AsyncStorage.setItem(key, dataJson);
};
const getData = async key => {
  try {
    let result = await AsyncStorage.getItem(key);
    if (result) {
      return JSON.parse(result);
    }
    console.log(result);
  } catch (error) {
    Alert.alert('error', error);
  }
};

export {saveData, getData};
