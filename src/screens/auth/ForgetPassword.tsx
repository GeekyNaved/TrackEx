import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import AuthTitle from '../../components/AuthTitle'
import CustButton from '../../components/CustButton'
import ErrorMessage from '../../components/ErrorMessage'
import TextInputField from '../../components/TextInputField'
import Colors from '../../constants/Colors'
const ForgetPassword = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <AuthTitle title="ForgetPassword" />
            <View style={styles.formContainer}>
                <TextInputField
                    placeholder="Enter Your Email"
                    otherProps={false}
                />
                <ErrorMessage msg='Invalid email' />

                <CustButton title="Reset Password"
                    onPress={() => navigation.navigate("MainTab")}
                    style={styles.button}
                    otherProps
                />
                <Text style={styles.account}>
                    <Text>Don't have an account?  </Text>
                    <Text onPress={() => navigation.navigate("Register")} style={styles.signIn}>Register</Text>
                </Text>
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
        paddingTop: verticalScale(50),
    },
    forgetPassword: {
        alignSelf: "flex-end"
    },
    button: {
        marginTop: verticalScale(20),
    },
    account: {
        textAlign: "center",
        marginTop: verticalScale(20),
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

export default ForgetPassword