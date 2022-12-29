import React from 'react'
import { Text, View, Button } from 'react-native'
const Register = ({ navigation } : any) => {
    return (
        <View
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 700 }}>
            <Text>Register</Text>
            <Button title="Login" onPress={() => navigation.navigate("Login")}>Click</Button>
            <Button title="Forget password" onPress={() => navigation.navigate("ForgetPassword")}>Click</Button>
        </View>
    )
}

export default Register