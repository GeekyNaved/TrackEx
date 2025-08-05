import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StackContainer, StackScreen } from '../Utils/StackContainer';
import AuthScreen from '../../screens/AuthScreen';
import ForgotPassword from '../../screens/ForgotPassword';
import { getItem } from '../../constants/asyncStorage';
import colors from '../../constants/colors'; // Make sure to import your colors

const AuthStack = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const user = await getItem('@user');
        console.log('User from AuthStack:', user);
        if (user) {
          navigation.replace('MainTab'); // Using replace instead of navigate to prevent going back
        }
      } catch (error) {
        console.error('Error checking authentication state:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.black} />
      </View>
    );
  }

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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white, // Use your app's background color
  },
});

export default AuthStack;