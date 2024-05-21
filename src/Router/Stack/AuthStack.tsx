import React from 'react';
import Signup from '../../screens/auth/Signup';
import {StackContainer, StackScreen} from '../Utils/StackContainer';

const AuthStack = () => {
  return (
    <StackContainer>
      {/* <StackScreen.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      /> */}
      <StackScreen.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      {/* <StackScreen.Screen
        name="InputOTP"
        component={InputOTP}
        options={{
          title: 'Verify Phone Number',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
          },
          headerShadowVisible: false,
        }}
      /> */}
      {/* <StackScreen.Screen
        name="SignupSetup"
        component={SignupSetup}
        options={{
          title: '',
          headerShadowVisible: false,
          headerTintColor: colors.black,
          headerTitleAlign: 'center',
        }}
      /> */}
    </StackContainer>
  );
};

export default AuthStack;
