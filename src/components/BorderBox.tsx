/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import boxModelSize from '../constants/boxModel';
import colors from '../constants/colors';
import {fontSize} from '../constants/fontSize';

const BorderBox = ({
  containerStyles,
  onPress,
  leftIcon,
  leftIconStyles,
  title,
  titleStyles,
  subtitle,
  subtitleStyles,
  rightIcon,
  rightIconStyles,
  disabled,
  disableWithoutBlur,
}) => {
  return (
    <TouchableOpacity
      style={[styles.borderBox, containerStyles, disabled && {opacity: 0.5}]}
      onPress={onPress}
      disabled={disabled || disableWithoutBlur}>
      <View style={styles.inner}>
        <View style={leftIconStyles}>{leftIcon}</View>
        <View>
          <Text style={[styles.name, titleStyles]}>{title}</Text>
          {subtitle ? (
            <Text style={[styles.address, subtitleStyles]}>{subtitle}</Text>
          ) : null}
        </View>
      </View>
      <View style={rightIconStyles}>{rightIcon}</View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  borderBox: {
    marginTop: boxModelSize.fifteen,
    borderWidth: boxModelSize.one,
    borderColor: colors.gray,
    borderRadius: boxModelSize.four,
    paddingHorizontal: boxModelSize.fifteen,
    paddingVertical: boxModelSize.ten,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: boxModelSize.ten,
    flexGrow: 0.95,
    flexShrink: 0.95,
  },
  name: {
    fontSize: fontSize.h6,
    // fontFamily: 'Poppins-Medium',
    color: colors.black,
  },
  address: {
    fontSize: fontSize.h6,
    // fontFamily: 'Poppins-Medium',
    color: colors.greySecondary,
  },
});

export default BorderBox;
