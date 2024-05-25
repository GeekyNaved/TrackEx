import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import colors from '../constants/colors';
import {fontSize} from '../constants/fontSize';
import boxModelSize from '../constants/boxModel';

interface CustButtonProps {
  title: string;
  onPress: any;
  style: object;
  variant: string;
  btnTxtStyles: object;
  otherProps: any;
}
const CustButton = ({
  isLoading,
  title,
  onPress,
  style,
  btnTxtStyles,
  variant,
  ...otherProps
}: CustButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[variant === 'light' ? styles.lightBtn : styles.darkBtn, style]}
      {...otherProps}>
      <Text
        style={[
          variant === 'light' ? styles.lightBtnTxt : styles.darkBtnTxt,
          btnTxtStyles,
        ]}>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.white} />
        ) : (
          title
        )}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  darkBtn: {
    backgroundColor: colors.blue,
    borderRadius: boxModelSize.four,
    borderWidth: 1,
    borderColor: colors.blue,
    paddingVertical: boxModelSize.ten,
  },
  lightBtn: {
    backgroundColor: colors.white,
    borderRadius: boxModelSize.four,
    borderWidth: 1,
    borderColor: colors.blue,
    paddingVertical: boxModelSize.ten,
    fontFamily: 'Poppins-Medium',
  },
  darkBtnTxt: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize.h5,
    textAlign: 'center',
    color: colors.white,
  },
  lightBtnTxt: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize.h5,
    textAlign: 'center',
    color: colors.blue,
  },
});

export default CustButton;
