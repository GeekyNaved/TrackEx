// src/components/CustTextInputField.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';
import boxModelSize from '../constants/boxModel';
import colors from '../constants/colors';
import { fontSize } from '../constants/fontSize';

interface inputFieldProps {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: any;
  style: object;
  containerStyles?: object;
  isFocused: boolean;
  mobileField: boolean;
  secureTextEntry?: boolean;
  verifyField?: boolean;
  verifiedField?: boolean;
  onVerifyPress?: () => void;
  errorMsg?: string;
  disabled?: boolean;
  otherProps?: any;
}

const CustTextInputField = ({
  label,
  containerStyles,
  placeholder,
  value,
  onChangeText,
  mobileField,
  isFocused,
  verifyField,
  verifiedField,
  onVerifyPress,
  style,
  errorMsg,
  disabled,
  secureTextEntry = false,
  ...otherProps
}: inputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={containerStyles}>
      <Text style={styles.label}>{label}</Text>
      {verifyField ? (
        <TouchableOpacity onPress={onVerifyPress} style={styles.verifyBtn}>
          <Text style={styles.verifyTxt}>Verify</Text>
        </TouchableOpacity>
      ) : verifiedField ? (
        <View style={styles.verifyBtn}>
          <Text style={styles.verifiedTxt}>Verified</Text>
        </View>
      ) : null}
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          placeholder={placeholder}
          style={[
            styles.input,
            style,
            disabled && styles.disabled,
            errorMsg && styles.error,
            isFocused && styles.focused,
            secureTextEntry && styles.passwordInput,
          ]}
          secureTextEntry={secureTextEntry && !showPassword}
          onChangeText={onChangeText}
          editable={disabled ? false : true}
          {...otherProps}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeSlashIcon size={20} color={colors.greySecondary} />
            ) : (
              <EyeIcon size={20} color={colors.greySecondary} />
            )}
          </TouchableOpacity>
        )}
      </View>
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

const styles = StyleSheet.create({
  input: {
    fontSize: fontSize.h5,
    color: colors.black,
    borderWidth: boxModelSize.one,
    borderRadius: boxModelSize.four,
    paddingVertical: boxModelSize.ten,
    paddingHorizontal: boxModelSize.fifteen,
    borderColor: colors.gray,
  },
  passwordInput: {
    paddingRight: boxModelSize.fourty, // Extra padding for the eye icon
  },
  inputContainer: {
    position: 'relative',
  },
  label: {
    fontSize: fontSize.h6,
    color: colors.black,
    fontWeight: '500',
    marginBottom: boxModelSize.five,
  },
  verifyBtn: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    paddingHorizontal: boxModelSize.ten,
    paddingVertical: boxModelSize.twentyFive,
    zIndex: 2,
  },
  verifyTxt: {
    fontSize: fontSize.p,
    color: colors.blue,
  },
  verifiedTxt: {
    fontSize: fontSize.p,
    color: colors.greenSecondary,
  },
  eyeIcon: {
    position: 'absolute',
    right: boxModelSize.ten,
    top: boxModelSize.ten,
    zIndex: 2,
  },
  countryCode: {
    position: 'absolute',
    left: 0,
    paddingHorizontal: boxModelSize.ten,
    zIndex: 2,
    paddingVertical: boxModelSize.ten,
  },
  codeTxt: {
    fontSize: fontSize.h5,
    color: colors.black,
  },
  error: {
    borderColor: colors.red,
  },
  errorTxt: {
    fontSize: fontSize.p,
    color: colors.red,
    textAlign: 'right',
  },
  focused: {
    borderColor: colors.blue,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CustTextInputField;