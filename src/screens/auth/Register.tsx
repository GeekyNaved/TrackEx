import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import AuthTextInputField from '../../components/AuthTextInputField'
import ErrorMessage from '../../components/ErrorMessage'
const Register = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Text>TrackEx</Text>
            <Text style={{ textAlign: 'center' }}>Registeration</Text>
            <AuthTextInputField
                placeholder="Enter Your Email"
                otherProps={false}
            />
            <ErrorMessage msg='Invalid' />
            <AuthTextInputField
                placeholder="Enter Your Email"
                otherProps={false}
            />
            <ErrorMessage msg='Invalid' />
            <AuthTextInputField
                placeholder="Password"
                secureTextEntry
            />
            <ErrorMessage msg='Invalid' />
            {/* <Button title="Login" onPress={() => navigation.navigate("Login")}>Click</Button> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: moderateScale(20)
        // backgroundColor: 'grey',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // height: verticalScale(800),
    }
})

export default Register