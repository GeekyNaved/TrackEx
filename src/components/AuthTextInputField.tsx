import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { verticalScale } from 'react-native-size-matters'
 interface inputFieldProps {
    placeholder: string,
    otherProps: any,
 }

const AuthTextInputField  = ({placeholder, ...otherProps}: inputFieldProps)  => {
    return (
        <TextInput
            placeholder={placeholder}
            // value=''
            style={styles.input}
            {...otherProps}
        />
    )
}

export default AuthTextInputField

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 20,
        marginVertical: verticalScale(10)
    }
})