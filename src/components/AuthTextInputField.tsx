import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import CustIcon from './CustIcon'
interface inputFieldProps {
    placeholder: string,
}

const AuthTextInputField = ({ placeholder }: inputFieldProps) => {
    const [showPassword, setShowPassword] = useState(true)
    return (
        <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
                <CustIcon size='large' color="purple" name={showPassword ? "eye-off" : "eye"} />
            </TouchableOpacity>
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={showPassword}
            />
        </View>
    )
}

export default AuthTextInputField

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: verticalScale(10),
    },
    input: {
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: moderateScale(15),
    },
    icon: {
        position: 'absolute',
        right: 0,
        paddingVertical: scale(10),
        paddingHorizontal: verticalScale(10),
        zIndex: 2,
        // paddingVertical: Platform.OS === 'android' ? scale(8) : null,
    }
})