import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainTab from '../Tab/MainTab';
import {StackContainer, StackScreen} from '../Utils/StackContainer';
import AuthStack from './AuthStack';
import EditTransaction from '../../screens/main/EditTransaction';
import colors from '../../constants/colors';
import PrivacyPolicy from '../../screens/main/PrivacyPolicy';
import TermsOfUse from '../../screens/main/TermsOfUse';

const MainNavigation = () => {
  // const token = null;
  const token = 'test';
  return (
    <NavigationContainer>
      <StackContainer>
        {/* {token !== null ? ( */}
        <StackScreen.Screen
          name="AuthStack"
          component={AuthStack}
          options={{headerShown: false}}
        />
        {/* // ) : ( */}
        <StackScreen.Screen
          name="MainTab"
          component={MainTab}
          options={{headerShown: false}}
        />
        {/* // )} */}
        <StackScreen.Screen
          name="EditTransaction"
          component={EditTransaction}
          options={({route}) => {
            const transactionType = route?.params?.type; // showing transaction type in header
            // capitalize all first letter of a word
            const type = transactionType
              .toLowerCase()
              .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
            return {
              title: `Edit ${type}`,
              headerTintColor: colors.black,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                textTransform: 'capitalize',
              },
              headerStyle: {
                backgroundColor: colors.green,
              },
            };
          }}
        />
        <StackScreen.Screen
          name="TermsOfUse"
          component={TermsOfUse}
          options={{
            headerTitle: 'Terms of Use',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: colors.green,
            },
          }}
        />
        <StackScreen.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{
            headerTitle: 'Privacy Policies',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: colors.green,
            },
          }}
        />
      </StackContainer>
    </NavigationContainer>
  );
};

export default MainNavigation;
