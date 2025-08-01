import React, {useState} from 'react';
import {
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

const Signup = ({navigation}) => {
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

  const registerWithEmail = async () => {
    try {
      const res = await auth().createUserWithEmailAndPassword(
        'naved@gmail.com',
        '654321',
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.blue} />
      <ScrollView>
        <Text style={styles.title}>Signup</Text>
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
            title={'Signup'}
            style={styles.btn}
            onPress={registerWithEmail}
          />

          <View style={styles.bottomLink}>
            <Text style={styles.msg}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.login}>login</Text>
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
  login: {
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
export default Signup;
