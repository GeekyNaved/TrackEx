import React, {useState} from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustTextInputField from '../../components/CustTextInputField';
import {SafeAreaView} from 'react-native-safe-area-context';
import boxModelSize from '../../constants/boxModel';
import colors from '../../constants/colors';
import {fontSize} from '../../constants/fontSize';
import CustButton from '../../components/CustButton';
import auth from '@react-native-firebase/auth';
import {setItem} from '../../constants/asyncStorage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleFocus = field => {
    setFocusedField(field);
  };
  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleChange = (key: string, value: any) => {
    if (key === 'email') {
      setEmail(value);
    }
    if (key === 'password') {
      setPassword(value);
    }
  };

  const signinWithEmail = async () => {
    try {
      const res = await auth().signInWithEmailAndPassword(
        'naved@gmail.com',
        '654321',
      );

      const user = res?.user;

      // Use storage utility to save user data
      await setItem('@user', user);
      console.log('User logged in and stored:', user);
      navigation.navigate('MainTab');
    } catch (error) {
      Alert.alert('Invalid credentials');
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.blue} />
      <ScrollView>
        <Text style={styles.title}>Login js</Text>
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
            keyboardType="email"
            errorMsg={errMsg}
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
            keyboardType="password"
            errorMsg={errMsg}
          />
          <CustButton
            title={'Login'}
            style={styles.btn}
            onPress={signinWithEmail}
          />

          <View style={styles.bottomLink}>
            <Text style={styles.msg}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signup}>Signup</Text>
            </TouchableOpacity>
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
    paddingHorizontal: boxModelSize.fifteen,
  },
  title: {
    marginTop: boxModelSize.twenty,
    fontSize: fontSize.h1,
    color: colors.black,
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
  signup: {
    fontSize: fontSize.h5,
    color: colors.blue,
    fontWeight: 'bold',
  },
  msg: {
    fontSize: fontSize.h6,
    color: colors.black,
    fontWeight: 'semibold',
  },
});
export default Login;
