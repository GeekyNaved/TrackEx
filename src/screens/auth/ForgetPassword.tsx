import React from 'react'
import { Text, View, Button } from 'react-native'
const ForgetPassword = ({ navigation }) => {
    return (
        <View
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 700 }}>
            <Text>ForgetPassword</Text>
            <Button title="Next" onPress={() => navigation.navigate("EmailVerification")}>Click</Button>
        </View>
    )
}

export default ForgetPassword