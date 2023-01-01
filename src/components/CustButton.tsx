import React from 'react'
import { Button, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import Colors from '../constants/Colors'

interface CustButtonProps {
    title: string,
    onPress: any,
    style: object
    otherProps: any,
}
const CustButton = ({ title, onPress, style, ...otherProps }: CustButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, style]}
            {...otherProps}>
            <Text style={styles.btnTitle}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.darkBlue,
        borderRadius: scale(10),
        paddingVertical: verticalScale(10)
    },
    btnTitle: {
        fontSize: moderateScale(22),
        textAlign: "center",
        color: Colors.white,
    }
})


export default CustButton