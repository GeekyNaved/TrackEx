import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'
 interface inputFieldProps {
    placeholder: string,
    otherProps: any,
 }

const TextInputField  = ({placeholder, ...otherProps}: inputFieldProps)  => {
    return (
        <TextInput
            placeholder={placeholder}
            style={styles.input}
            {...otherProps}
        />
    )
}

export default TextInputField

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: moderateScale(15),
        marginVertical: verticalScale(10)
    }
})