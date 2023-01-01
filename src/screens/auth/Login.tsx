import React from 'react'
import { Text, View, StyleSheet} from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import AuthTextInputField from '../../components/AuthTextInputField'
import AuthTitle from '../../components/AuthTitle'
import CustButton from '../../components/CustButton'
import ErrorMessage from '../../components/ErrorMessage'
import TextInputField from '../../components/TextInputField'
import Colors from '../../constants/Colors'
const Login = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <AuthTitle title="Login" />
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
                <Text onPress={() => navigation.navigate("ForgetPassword")} style={styles.forgetPassword}>Forgot Password ?</Text>

                <CustButton title="Login"
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
})

export default Login