import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export const StackScreen = createNativeStackNavigator();

export const StackContainer = ({children}: any) => {
  const horizontalAnimation = {
    gestureDirection: 'horizontal',
    // headerShown: 'none',
    cardStyleInterpolator: ({current, layouts}: any) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };
  return (
    <StackScreen.Navigator screenOptions={horizontalAnimation}>
      {children}
    </StackScreen.Navigator>
  );
};
