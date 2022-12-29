import React from 'react'
import { Text, View, Button } from 'react-native'
const Login = ({navigation} : any) => {
    return (
        <View
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 700 }}>
            <Text>Login</Text>
            <Button title="Login" onPress={() => navigation.navigate("MainTab")}>Click</Button>
            <Button title="Register" onPress={() => navigation.navigate("Register")} />
        </View>
    )
}

export default Login