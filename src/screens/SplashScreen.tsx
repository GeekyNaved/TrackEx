import React from 'react';
import {StatusBar, Text} from 'react-native';
import {StyleSheet, View} from 'react-native';
import boxModelSize from '../constants/boxModel';
import colors from '../constants/colors';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.blue} />
      <View style={styles.imageContainer}>
        <Text>Splash screen</Text>
        {/* <Image source={require('../assets/logo.png')} style={styles.logo} /> */}
        {/* <Image source={require('../assets/bag.png')} style={styles.bag} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: boxModelSize.screenHeight,
  },
  imageContainer: {
    alignItems: 'center',
    gap: boxModelSize.ninety,
  },
  logo: {
    resizeMode: 'contain',
    width: boxModelSize.twoFifty,
    height: boxModelSize.sixty,
  },
  bag: {
    width: boxModelSize.fourHundredFifty,
    height: boxModelSize.twoHundred,
    resizeMode: 'contain',
  },
});
export default SplashScreen;
