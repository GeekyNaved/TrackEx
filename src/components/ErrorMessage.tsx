import React from 'react'
import { StyleSheet, Text } from 'react-native'
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
        color: Colors.red
    }
})

export default ErrorMessage