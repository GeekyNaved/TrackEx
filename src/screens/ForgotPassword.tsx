// src/screens/auth/ForgotPassword.tsx
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

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [focusedField, setFocusedField] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFocus = (field) => {
        setFocusedField(field);
        setEmailError('');
        setGeneralError('');
    };

    const handleBlur = () => {
        setFocusedField(null);
    };

    const handleChange = (value: string) => {
        setEmail(value);
        setEmailError('');
        setGeneralError('');
        setSuccessMessage('');
    };

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateForm = () => {
        if (!email.trim()) {
            setEmailError('Please enter email');
            return false;
        }
        if (!validateEmail(email.trim())) {
            setEmailError('Please enter a valid email');
            return false;
        }
        return true;
    };

      const handleResetPassword = async () => {
        setLoading(true);
        setGeneralError('');
        setSuccessMessage('');

        if (!validateForm()) {
          setLoading(false);
          return;
        }

        try {
          await auth().sendPasswordResetEmail(email.trim());
          setSuccessMessage('If this email is registered, a password reset link has been sent.');
          setEmail('');
        } catch (error: any) {
          handleError(error);
        } finally {
          setLoading(false);
        }
      };

      const handleError = (error: any) => {
        console.log('error', error.code);
        let errorMessage = 'Password reset failed. Please try again.';

        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'Email address is invalid!';
            break;
          case 'auth/user-not-found':
            errorMessage = 'No user found with this email';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many requests! Please try later';
            break;
        }

        setGeneralError(errorMessage);
      };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={colors.blue} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.content}>
                    <Text style={styles.title}>Forgot Password</Text>
                    <Text style={styles.subtitle}>
                        Enter your email to receive a password reset link
                    </Text>

                    <View style={styles.formContainer}>
                        <CustTextInputField
                            label="Email"
                            containerStyles={styles.input}
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={handleChange}
                            isFocused={focusedField === 'email'}
                            onFocus={() => handleFocus('email')}
                            onBlur={handleBlur}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            errorMsg={emailError}
                        />

                        {generalError ? (
                            <Text style={styles.generalError}>{generalError}</Text>
                        ) : null}

                        {successMessage ? (
                            <Text style={styles.successMessage}>{successMessage}</Text>
                        ) : null}

                        <CustButton
                            title={'Send Reset Link'}
                            style={styles.btn}
                            onPress={handleResetPassword}
                            isLoading={loading}
                        />

                        <View style={styles.bottomLinks}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text style={styles.linkText}>Back to Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: boxModelSize.twenty,
        paddingTop: boxModelSize.thirty,
    },
    title: {
        fontSize: fontSize.h1,
        color: colors.black,
        fontWeight: 'bold',
        marginBottom: boxModelSize.ten,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: fontSize.h5,
        color: colors.greySecondary,
        textAlign: 'center',
        marginBottom: boxModelSize.thirty,
    },
    formContainer: {
        marginTop: boxModelSize.twenty,
    },
    input: {
        marginBottom: boxModelSize.fifteen,
    },
    btn: {
        marginTop: boxModelSize.twenty,
    },
    bottomLinks: {
        marginTop: boxModelSize.twentyFive,
        alignItems: 'center',
    },
    linkText: {
        fontSize: fontSize.h5,
        color: colors.blue,
        fontWeight: '500',
    },
    generalError: {
        color: colors.red,
        fontSize: fontSize.h6,
        textAlign: 'center',
        marginTop: boxModelSize.ten,
    },
    successMessage: {
        color: colors.green,
        fontSize: fontSize.h6,
        textAlign: 'center',
        marginTop: boxModelSize.ten,
    },
});

export default ForgotPassword;