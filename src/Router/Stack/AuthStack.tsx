import React from 'react';
import { StackContainer, StackScreen } from '../Utils/StackContainer';
import AuthScreen from '../../screens/AuthScreen';
import ForgotPassword from '../../screens/ForgotPassword';

const AuthStack = () => {
  return (
    <StackContainer>
      <StackScreen.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <StackScreen.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
    </StackContainer>
  );
};

export default AuthStack;
