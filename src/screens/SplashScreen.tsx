import React from 'react';
import {Button, Text} from 'react-native';

const SplashScreen = () => {
  return (
    <View
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Text>SplashScreen</Text>
      <Button title="Next">Click</Button>
    </View>
  );
};

export default SplashScreen;
