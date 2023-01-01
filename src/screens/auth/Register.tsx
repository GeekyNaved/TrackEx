import { Link } from '@react-navigation/native'
import React from 'react'
import { Text, View, Button, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import AuthTextInputField from '../../components/AuthTextInputField'
import AuthTitle from '../../components/AuthTitle'
import CustButton from '../../components/CustButton'
import ErrorMessage from '../../components/ErrorMessage'
import TextInputField from '../../components/TextInputField'
import Colors from '../../constants/Colors'
const Register = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <AuthTitle title="Registration" />
            <View style={styles.formContainer}>
                <TextInputField
                    placeholder="Enter Your Email"
                    otherProps={false}
                />
                <ErrorMessage msg='Invalid email' />
                <AuthTextInputField
                    placeholder="Your password"
                />
                <ErrorMessage msg='Invalid password' />
                <AuthTextInputField
                    placeholder="Confirm password"
                />
                <ErrorMessage msg='Invalid password' />
                <CustButton title="Sign up"
                    onPress={() => navigation.navigate("Login")}
                    style={styles.button}
                    otherProps
                />
                <Text style={styles.account}>
                    <Text>Already have an account?  </Text>
                    <Text onPress={() => navigation.navigate("Login")} style={styles.signIn}>Sign In</Text>
                </Text>


                <TouchableOpacity onPress={() => Linking.openURL("https://coolors.co/image-picker")}>
                    <Text style={styles.agreement}>Read User License Agreement</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: moderateScale(20),
        backgroundColor: Colors.white
    },
    formContainer: {
        // backgroundColor: 'orange',
        paddingTop: verticalScale(50),
    },
    button: {
        marginTop: verticalScale(60),
    },
    account: {
        textAlign: "center",
        marginTop: verticalScale(10),
        color: Colors.black
    },
    signIn: {
        textDecorationLine: "underline"
    },
    agreement: {
        marginTop: verticalScale(20),
        textAlign: "center",
    }
})

export default Register