import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import Colors from '../constants/Colors'
interface errorMessageInputProps {
    msg: string
}
const ErrorMessage = ({msg}: errorMessageInputProps) => {
  return (
    <Text style={styles.errorMsg}>{msg}</Text>
  )
}

const styles = StyleSheet.create({
    errorMsg: {
        color: Colors.red,
        marginBottom: verticalScale(15)
    }
})

export default ErrorMessage