import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {scale} from 'react-native-size-matters';
import {
  BanknotesIcon,
  Cog6ToothIcon,
  HomeIcon,
  PlusIcon,
  TagIcon,
} from 'react-native-heroicons/outline';
import Transactions from '../../screens/main/Transactions';
import Add from '../../screens/main/Add';
import Categories from '../../screens/main/Categories';
import Settings from '../../screens/main/Settings';
import Home from '../../screens/main/Home';
import colors from '../../constants/colors';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      // tabBarOptions={{
      //   activeTintColor: colors.blue,
      // }}
      screenOptions={({route}) => ({
        tabBarActiveTintColor: colors.blue,
        tabBarLabelStyle: {fontFamily: 'Poppins-Medium'},
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? (
              <HomeIcon color={colors.blue} size={scale(25)} />
            ) : (
              <HomeIcon color={colors.black} size={scale(25)} />
            );
          } else if (route.name === 'Transactions') {
            iconName = focused ? (
              <BanknotesIcon color={colors.blue} size={scale(25)} />
            ) : (
              <BanknotesIcon color={colors.black} size={scale(25)} />
            );
          } else if (route.name === 'Add') {
            iconName = focused ? (
              <PlusIcon color={colors.blue} size={scale(25)} />
            ) : (
              <PlusIcon color={colors.black} size={scale(25)} />
            );
          } else if (route.name === 'Categories') {
            iconName = focused ? (
              <TagIcon color={colors.blue} size={scale(25)} />
            ) : (
              <TagIcon color={colors.black} size={scale(25)} />
            );
          } else if (route.name === 'Settings') {
            iconName = focused ? (
              <Cog6ToothIcon color={colors.blue} size={scale(25)} />
            ) : (
              <Cog6ToothIcon color={colors.black} size={scale(25)} />
            );
          }
          // You can return any component that you like here!
          return iconName;
        },
      })}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Add" component={Add} options={{headerShown: false}} />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
