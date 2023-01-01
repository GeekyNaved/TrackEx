import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../constants/Colors';

interface AuthTitleProps {
    title: string
}

const AuthTitle = ({title}: AuthTitleProps) => {
  return <Text style={styles.title}>{title}</Text>;
};


const styles = StyleSheet.create({
    title: {
        color: Colors.darkBlue,
        textAlign: 'center',
        fontSize: moderateScale(30),
    }
})

export default AuthTitle;

