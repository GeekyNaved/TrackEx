import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import CustButton from '../../components/CustButton';
import CustSnackBar from '../../components/CustSnackBar';
import axios from 'axios';
import Config from '../../constants/config';
import boxModelSize from '../../constants/boxModel';
import colors from '../../constants/colors';
import {fontSize} from '../../constants/fontSize';
import CustTextInputField from '../../components/CustTextInputField';
// import CountryDialCodeDropdown from '../../components/CountryDialCodeDropdown';

const Signup = ({navigation}: any) => {
  const [mobileNum, setMobileNum] = useState('');
  const [mobileNumError, setMobileNumError] = useState('');
  const [disableBtn, setDisableBtn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // const [locationPermission, setLocationPermission] = useState(false);
  // const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  useEffect(() => {
    if (mobileNum.length == 0) {
      setMobileNumError('');
      return;
    }
    if (mobileNum.startsWith('0')) {
      if (mobileNum.length !== 11) {
        setMobileNumError('Please enter a valid phone number');
        setIsFocused(false);
        setDisableBtn(true);
      } else {
        setIsFocused(true);
        setDisableBtn(false);
      }
    } else {
      // console.log('mobileNum length:', mobileNum?.length);
      if (mobileNum.length !== 10) {
        setMobileNumError('Please enter a valid phone number');
        setIsFocused(false);
        setDisableBtn(true);
      } else {
        setIsFocused(true);
        setDisableBtn(false);
      }
    }
  }, [mobileNum]);
  const handleChange = (key: string, value: string) => {
    if (key === 'mobileNum') {
      setMobileNumError('');
      setIsFocused(true);
      const modifiedValue = value.replace(/\D/g, '');
      setMobileNum(modifiedValue);
    }
  };

  const onSubmitRegister = async () => {
    navigation.navigate('MainTab');
    return;
    setIsLoading(true);
    try {
      const response = await axios.post(Config.BASE_URL + 'sendotp', {
        // mobileCode: dialCode,
        mobileNumber: mobileNum,
      });
      if (response.data.message == 'OTP sent successfully') {
        // OTP verified successfully
        setIsLoading(false);
        setMobileNum('');
        setDisableBtn(true);
        navigation.navigate('InputOTP', {mobileNumber: mobileNum});
      } else {
        setIsLoading(false);
        CustSnackBar('Technical issue occurred. Please try again later.');
      }
    } catch (error) {
      setIsLoading(false);
      CustSnackBar('Encountered technical issue. Please try again later.');
      console.log('error?.response?.data:SendOTP', error?.response?.data);
    }

    // console.log('mobileNum:submitted', mobileNum);
    // setMobileNum('');
    // setDisableBtn(true);
    // navigation.navigate('InputOTP');
    // navigation.navigate('MainTab');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.blue} />

      <ScrollView
        keyboardShouldPersistTaps="always"
        // contentContainerStyle={{ flexGrow: 1 }}
      >
        <View>
          {/* <Image
            source={require('../../assets/login_banner.png')}
            style={styles.login_banner}
          /> */}
          <View style={styles.innerContainer}>
            <Text style={styles.greetingsMsg}>Hey, there</Text>
            <CustTextInputField
              mobileField
              style={styles.input}
              placeholder="Enter Mobile Number"
              value={mobileNum}
              keyboardType="phone-pad"
              onChangeText={handleChange.bind(this, 'mobileNum')}
              isFocused={isFocused}
              onFocus={handleFocus}
              onBlur={handleBlur}
              errorMsg={mobileNumError}
            />
            <CustButton
              disabled={disableBtn}
              isLoading={isLoading}
              title="Continue"
              style={[styles.button, disableBtn && styles.disabledBtn]}
              onPress={onSubmitRegister}
              otherProps
            />
            {/* <View style={styles.noAccount}>
              <Text style={styles.noAccountTxt}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signUpTxt}> Login Here</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: boxModelSize.screenHeight,
    backgroundColor: colors.white,
  },
  login_banner: {
    width: boxModelSize.screenWidth,
    // height: boxModelSize.screenHeight - verticalScale(350),
    resizeMode: 'cover',
  },
  innerContainer: {
    padding: boxModelSize.xl,
    backgroundColor: colors.white,
  },
  headingContainer: {
    paddingVertical: boxModelSize.xl,
  },
  greetingsMsg: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize.h5,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize.h3,
    color: colors.black,
    fontWeight: '600',
  },
  subTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize.h6,
    color: colors.greySecondary,
  },
  input: {
    paddingHorizontal: boxModelSize.xxxl,
  },
  button: {
    backgroundColor: colors.blue,
    marginTop: boxModelSize.xl,
  },
  disabledBtn: {
    opacity: 0.5,
  },
  noAccount: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: boxModelSize.m,
  },
  noAccountTxt: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize.p,
    color: colors.greySecondary,
  },
  signUpTxt: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize.p,
    color: colors.blue,
  },
});

export default Signup;
