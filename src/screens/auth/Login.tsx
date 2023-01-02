import React, { useState } from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import AuthTextInputField from '../../components/AuthTextInputField'
import AuthTitle from '../../components/AuthTitle'
import CustButton from '../../components/CustButton'
import ErrorMessage from '../../components/ErrorMessage'
import TextInputField from '../../components/TextInputField'
import Colors from '../../constants/Colors'
const Login = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validEmail = (emailId: string) => {
        let mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (emailId.match(mailformat)) {
            return true;
        }
        else {
            return false;
        }
    }

    const handleChange = (key: string, value: string) => {
        if (key === "email") {
            setEmailError("");
            setEmail(value);
        }
        if (key === "password") {
            setPasswordError("");
            setPassword(value.replace(/\s+/g, ""))
        }
    }

    const onSubmitLogin = () => {
        if (email.length == 0) {
            setEmailError("No email provided");
            // return false;
        }
        else if (!validEmail(email)) {
            setEmailError("Invalid Email");
        }
        if (password.length == 0) {
            setPasswordError("No password provided");
        }
        else if (password.length != 8) {
            setPasswordError("Password must be of atleast 8 characters")
        }
        if (validEmail(email) && (password.length == 8)) {
            console.log(email, password);
            Alert.alert('submitted')
        }
    }
    return (
        <View style={styles.container}>
            <AuthTitle title="Login" />
            <View style={styles.formContainer}>
                <TextInputField
                    placeholder="Enter Your Email"
                    otherProps={false}
                    keyboardType="email-address"
                    onChangeText={handleChange.bind(this, "email")}
                />
                {emailError ? <ErrorMessage msg={emailError} /> : null}
                <AuthTextInputField
                    placeholder="Your password"
                    onChangeText={handleChange.bind(this, "password")}
                />
                {passwordError ? <ErrorMessage msg={passwordError} /> : null}
                <Text onPress={() => navigation.navigate("ForgetPassword")} style={styles.forgetPassword}>Forgot Password ?</Text>

                <CustButton title="Login"
                    style={styles.button}
                    onPress={onSubmitLogin}
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