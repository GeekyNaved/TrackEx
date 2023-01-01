import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import AuthTextInputField from '../../components/AuthTextInputField'
import ErrorMessage from '../../components/ErrorMessage'
import TextInputField from '../../components/TextInputField'
const Register = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Text>TrackEx</Text>
            <Text style={{ textAlign: 'center' }}>Registeration</Text>
            <TextInputField
                placeholder="Enter Your Email"
                otherProps={false}
            />
            <AuthTextInputField
                placeholder="Your password"
            />
            <ErrorMessage msg='Invalid password' />
            <AuthTextInputField
                placeholder="Confirm password"
            />
            <ErrorMessage msg='Invalid password' />

            <Button title="Login" onPress={() => navigation.navigate("Login")} />
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