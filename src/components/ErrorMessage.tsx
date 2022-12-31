import React from 'react'
import { StyleSheet, Text } from 'react-native'
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
        color: 'red'
    }
})

export default ErrorMessage