// storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Store data in AsyncStorage
 * @param {string} key - The key under which the value will be stored
 * @param {any} value - The value to store
 */
export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log(`${key} saved successfully!`);
  } catch (error) {
    console.log(`Error saving ${key}:`, error);
  }
};

/**
 * Retrieve data from AsyncStorage
 * @param {string} key - The key of the value to retrieve
 * @returns {Promise<any>} - The retrieved value, or null if not found
 */
export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.log(`Error retrieving ${key}:`, error);
    return null;
  }
};

/**
 * Remove data from AsyncStorage
 * @param {string} key - The key of the value to remove
 */
export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`${key} removed successfully!`);
  } catch (error) {
    console.log(`Error removing ${key}:`, error);
  }
};
