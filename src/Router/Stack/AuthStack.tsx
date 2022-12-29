import React from 'react'
import ForgetPassword from '../../screens/auth/ForgetPassword'
import Login from '../../screens/auth/Login'
import Register from '../../screens/auth/Register'
import { StackContainer, StackScreen } from '../Utils/StackContainer'

const AuthStack = () => {
    return (
        <StackContainer>
            <StackScreen.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <StackScreen.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />
            <StackScreen.Screen
                name="ForgetPassword"
                component={ForgetPassword}
                options={{ headerShown: false }}
            />


        </StackContainer>
    )
}

export default AuthStack