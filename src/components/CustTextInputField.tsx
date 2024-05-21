/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import boxModelSize from '../constants/boxModel';
import colors from '../constants/colors';
import {fontSize} from '../constants/fontSize';
// import CustIcon from './CustIcon'
interface inputFieldProps {
  placeholder: string;
  onChangeText: any;
  style: object;
  mobileField: boolean;
  otherProps: any;
}

const CustTextInputField = ({
  containerStyles,
  placeholder,
  onChangeText,
  mobileField,
  isFocused,
  verifyField,
  verifiedField,
  onVerifyPress,
  style,
  errorMsg,
  disabled,
  ...otherProps
}: inputFieldProps) => {
  return (
    <View style={containerStyles}>
      {verifyField ? (
        <TouchableOpacity onPress={onVerifyPress} style={styles.verifyBtn}>
          <Text style={styles.verifyTxt}>Verify</Text>
        </TouchableOpacity>
      ) : verifiedField ? (
        <View style={styles.verifyBtn}>
          <Text style={styles.verifiedTxt}>Verified</Text>
        </View>
      ) : null}
      <TextInput
        placeholder={placeholder}
        style={[
          styles.input,
          style,
          disabled && styles.disabled,
          errorMsg && styles.error,
          isFocused && styles.focused,
        ]}
        // secureTextEntry={showPassword}
        onChangeText={onChangeText}
        editable={disabled ? false : true}
        {...otherProps}
      />
      {mobileField ? (
        <View style={styles.countryCode}>
          <Text style={[styles.codeTxt, disabled && styles.disabled]}>+44</Text>
        </View>
      ) : null}
      {errorMsg?.length > 0 ? (
        <Text style={styles.errorTxt}>{errorMsg}</Text>
      ) : null}
    </View>
  );
};

export default CustTextInputField;

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize.h5,
    color: colors.black,
    // fontWeight: '600',
    borderWidth: boxModelSize.one,
    borderRadius: boxModelSize.four,
    paddingVertical: boxModelSize.m,
    paddingHorizontal: boxModelSize.l,
    borderColor: colors.gray,
  },
  verifyBtn: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    paddingHorizontal: boxModelSize.m,
    paddingVertical: boxModelSize.xxl,
    zIndex: 2,
  },
  verifyTxt: {
    fontSize: fontSize.p,
    fontFamily: 'Poppins-Medium',
    color: colors.blue,
  },
  verifiedTxt: {
    fontSize: fontSize.p,
    fontFamily: 'Poppins-Medium',
    color: colors.greenSecondary,
  },
  icon: {
    position: 'absolute',
    right: 0,
    paddingVertical: boxModelSize.m,
    paddingHorizontal: boxModelSize.m,
    zIndex: 2,
    // paddingVertical: Platform.OS === 'android' ? scale(8) : null,
  },
  countryCode: {
    position: 'absolute',
    left: 0,
    paddingHorizontal: boxModelSize.m,
    zIndex: 2,
    paddingVertical: boxModelSize.m,
    // paddingVertical: Platform.OS === 'android' ? scale(8) : null,
  },
  codeTxt: {
    fontSize: fontSize.h5,
    color: colors.black,
    fontFamily: 'Poppins-Medium',
  },
  error: {
    borderColor: colors.red,
  },
  errorTxt: {
    fontSize: fontSize.p,
    color: colors.red,
    fontFamily: 'Poppins-Medium',
    textAlign: 'right',
  },
  focused: {
    borderColor: colors.blue, // Change the color when focused
  },
  disabled: {
    opacity: 0.5,
  },
});
