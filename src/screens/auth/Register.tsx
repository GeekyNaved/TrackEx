import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import AuthTextInputField from '../../components/AuthTextInputField'
import AuthTitle from '../../components/AuthTitle'
import CustButton from '../../components/CustButton'
import ErrorMessage from '../../components/ErrorMessage'
import TextInputField from '../../components/TextInputField'
import Colors from '../../constants/Colors'
const Register = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

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
        if (key === "confirmPassword") {
            setConfirmPasswordError("");
            setConfirmPassword(value.replace(/\s+/g, ""));
        }
    }

    const onSubmitRegister = () => {
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
        if (password !== confirmPassword) {
            setConfirmPasswordError("Password not matched")
        }
        // console.log(email, password)
        if (validEmail(email) && (password.length == 8 && password === confirmPassword)) {
            console.log(email, password, confirmPassword);
            Alert.alert('submitted')
        }
    }

    return (
        <View style={styles.container}>
            <AuthTitle title="Registration" />
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
                <AuthTextInputField
                    placeholder="Confirm password"
                    onChangeText={handleChange.bind(this, "confirmPassword")}
                />
                {confirmPasswordError ? <ErrorMessage msg={confirmPasswordError} /> : null}
                <CustButton
                    title="Register"
                    style={styles.button}
                    onPress={onSubmitRegister}
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