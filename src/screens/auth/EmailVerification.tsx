import React from 'react'
import { Text, View, Button } from 'react-native'
const EmailVerification = ({ navigation }) => {
    return (
        <View
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 700 }}>
            <Text>EmailVerification</Text>
            <Button title="Go to Login" onPress={() => navigation.navigate("Signin")}>Click</Button>
        </View>
    )
}

export default EmailVerification