// import CustSnackBar from '../components/snackBar';
// import {submitError} from '../services/errorLog';

import AsyncStorage from '@react-native-async-storage/async-storage';

// export const setSessionData = async (key, value) => {
//   try {
//     await AsyncStorage.setItem('@' + key, value);
//   } catch (error) {
//     submitError('Async Storage', 'try to set value to ' + key, error.message);
//   }
// };

// export const getSessionData = async (key) => {
//   try {
//     const value = await AsyncStorage.getItem('@' + key);
//     return value !== null ? value : null;
//   } catch (error) {
//     submitError('Async Storage', 'try to get value from ' + key, error.message);
//   }
// };

// export const setSessionDataObject = async (key, value) => {
//   try {
//     const jsonValue = JSON.stringify(value);
//     await AsyncStorage.setItem('@' + key, jsonValue);
//   } catch (error) {
//     submitError('Async Storage', 'try to set object to ' + key, error.message);
//   }
// };

// export const getSessionDataObject = async (key) => {
//   try {
//     const jsonValue = await AsyncStorage.getItem('@' + key);
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch (error) {
//     submitError(
//       'Async Storage',
//       'try to set object from ' + key,
//       error.message,
//     );
//   }
// };

export const clearSession = () => {
  AsyncStorage.clear();
};
