// src/screens/auth/AuthScreen.tsx
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustTextInputField from '../components/CustTextInputField';
import { SafeAreaView } from 'react-native-safe-area-context';
import boxModelSize from '../constants/boxModel';
import colors from '../constants/colors';
import { fontSize } from '../constants/fontSize';
import CustButton from '../components/CustButton';
import auth from '@react-native-firebase/auth';
import { setItem } from '../constants/asyncStorage';
import firestore from '@react-native-firebase/firestore';

const AuthScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFocus = (field) => {
    setFocusedField(field);
    // Clear specific error when field is focused
    if (field === 'email') setEmailError('');
    if (field === 'password') setPasswordError('');
    if (field === 'confirmPassword') setConfirmPasswordError('');
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleChange = (key: string, value: any) => {
    // Clear errors when typing
    if (key === 'email') {
      setEmail(value);
      setEmailError('');
    }
    if (key === 'password') {
      setPassword(value);
      setPasswordError('');
    }
    if (key === 'confirmPassword') {
      setConfirmPassword(value);
      setConfirmPasswordError('');
    }
    setGeneralError('');
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    let isValid = true;

    // Email validation (common for both login and signup)
    if (!email.trim()) {
      setEmailError('Please enter email');
      isValid = false;
    } else if (!validateEmail(email.trim())) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    // Password validation (common for both)
    if (!password.trim()) {
      setPasswordError('Please enter password');
      isValid = false;
    } else if (password.trim().length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    // Additional validation for signup
    if (!isLogin) {
      if (!confirmPassword.trim()) {
        setConfirmPasswordError('Please confirm password');
        isValid = false;
      } else if (password !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
        isValid = false;
      }
    }

    return isValid;
  };

  const createUserDocument = async (user: any) => {
    try {
      await firestore().collection('users').doc(user.uid).set({
        email: user.email,
        createdAt: firestore.FieldValue.serverTimestamp(),
        currency: 'INR', // Default currency
        monthlyBudget: 0, // Default budget
      });

      // Create default categories for the user
      await createDefaultCategories(user.uid);
    } catch (error) {
      console.error('Error creating user document:', error);
    }
  };

  const createDefaultCategories = async (userId: string) => {
    const defaultIncomeCategories = [
      { label: 'Salary', value: 'Salary' },
      { label: 'Freelance', value: 'Freelance' },
      { label: 'Business', value: 'Business' },
    ];

    const defaultExpenseCategories = [
      { label: 'Food', value: 'Food' },
      { label: 'Transportation', value: 'Transportation' },
      { label: 'Housing', value: 'Housing' },
      { label: 'Entertainment', value: 'Entertainment' },
    ];

    try {
      const batch = firestore().batch();
      const userRef = firestore().collection('users').doc(userId);

      defaultIncomeCategories.forEach(cat => {
        const catRef = userRef.collection('categories').doc();
        batch.set(catRef, { ...cat, type: 'income' });
      });

      defaultExpenseCategories.forEach(cat => {
        const catRef = userRef.collection('categories').doc();
        batch.set(catRef, { ...cat, type: 'expense' });
      });

      await batch.commit();
    } catch (error) {
      console.error('Error creating default categories:', error);
    }
  };

  const handleAuth = async () => {
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Login logic
        const res = await auth().signInWithEmailAndPassword(
          email.trim(),
          password.trim(),
        );
        const user = res?.user;
        await setItem('@user', user);
        console.log('User logged in and stored:', user);
        navigation.navigate('MainTab');
      } else {
        // Signup logic
        const res = await auth().createUserWithEmailAndPassword(
          email.trim(),
          password.trim(),
        );
        const user = res?.user;
        await createUserDocument(user);
        await setItem('@user', user);
        console.log('User created and stored:', user);
        navigation.navigate('MainTab');
      }
    } catch (error: any) {
      handleError(error);
      console.log("error:CatchBlock", error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error: any) => {
    console.log('error', error.code);
    let errorMessage = isLogin
      ? 'Login failed. Please try again.'
      : 'Signup failed. Please try again.';

    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Email address is already in use!';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Email address is invalid!';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Wrong password!';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password is too weak!';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many requests! Please try later';
        break;
      case 'auth/user-not-found':
        errorMessage = 'No user found! Please sign up';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Invalid Credentials';
        break;
      default:
        errorMessage = isLogin
          ? 'Login failed. Please try again.'
          : 'Signup failed. Please try again.';
    }

    setGeneralError(errorMessage);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    // Clear all fields and errors when toggling
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setGeneralError('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.blue} />
      <ScrollView>
        <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>
        <View style={styles.formContainer}>
          <CustTextInputField
            label="Email"
            containerStyles={styles.input}
            placeholder="Enter email"
            value={email}
            onChangeText={handleChange.bind(this, 'email')}
            isFocused={focusedField === 'email'}
            onFocus={() => handleFocus('email')}
            onBlur={handleBlur}
            keyboardType="email-address"
            autoCapitalize="none"
            errorMsg={emailError}
          />
          <CustTextInputField
            label="Password"
            containerStyles={styles.input}
            placeholder="Enter password"
            value={password}
            onChangeText={handleChange.bind(this, 'password')}
            isFocused={focusedField === 'password'}
            onFocus={() => handleFocus('password')}
            onBlur={handleBlur}
            secureTextEntry={true}
            errorMsg={passwordError}
          />

          {!isLogin && (
            <CustTextInputField
              label="Confirm Password"
              containerStyles={styles.input}
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={handleChange.bind(this, 'confirmPassword')}
              isFocused={focusedField === 'confirmPassword'}
              onFocus={() => handleFocus('confirmPassword')}
              onBlur={handleBlur}
              secureTextEntry={true}
              errorMsg={confirmPasswordError}
            />
          )}

          {generalError ? (
            <Text style={styles.generalError}>{generalError}</Text>
          ) : null}

          <CustButton
            title={isLogin ? 'Login' : 'Sign Up'}
            style={styles.btn}
            onPress={handleAuth}
            isLoading={loading}
          />

          <View style={styles.bottomLink}>
            <Text style={styles.msg}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </Text>
            <TouchableOpacity onPress={toggleAuthMode}>
              <Text style={styles.toggleAuth}>
                {isLogin ? 'Sign Up' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>
          {isLogin ? <View style={styles.extraLinks}>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: boxModelSize.fifteen,
  },
  title: {
    marginTop: boxModelSize.twenty,
    fontSize: fontSize.h1,
    color: colors.black,
    textAlign: 'center',
  },
  formContainer: {
    marginTop: boxModelSize.twentyFive,
  },
  input: {
    marginTop: boxModelSize.fifteen,
  },
  btn: {
    marginTop: boxModelSize.thirty,
  },
  bottomLink: {
    marginTop: boxModelSize.twenty,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleAuth: {
    fontSize: fontSize.h5,
    color: colors.blue,
    fontWeight: 'bold',
  },
  msg: {
    fontSize: fontSize.h6,
    color: colors.black,
    fontWeight: 'semibold',
  },
  generalError: {
    color: colors.red,
    fontSize: fontSize.h6,
    textAlign: 'center',
    marginTop: boxModelSize.ten,
  },
  extraLinks: {
    marginTop: boxModelSize.ten,
    alignItems: 'center',
  },
  linkText: {
    fontSize: fontSize.h5,
    color: colors.blue,
    fontWeight: '500',
  },
});

export default AuthScreen;
