import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import colors from '../../constants/colors';
import {fontSize} from '../../constants/fontSize';
import CategoryIncome from './CategoryIncome';
import CategoryExpense from './CategoryExpense';

const Categories = () => {
  const TopTab = createMaterialTopTabNavigator();
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.green,
        },
        tabBarLabelStyle: {
          fontSize: fontSize.h5,
          textTransform: 'capitalize',
        },
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.gray,
        tabBarIndicatorStyle: {backgroundColor: colors.black},
      }}>
      <TopTab.Screen
        name="Income"
        component={CategoryIncome}
        // props={showDetails}
        options={{
          tabBarLabelStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <TopTab.Screen
        name="Expense"
        component={CategoryExpense}
        options={{
          tabBarLabelStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </TopTab.Navigator>
  );
};

export default Categories;
