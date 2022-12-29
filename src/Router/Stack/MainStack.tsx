import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import MainTab from '../Tab/MainTab'
import { StackContainer, StackScreen } from '../Utils/StackContainer'
import AuthStack from './AuthStack'

const MainNavigation = () => {
    return (
        <NavigationContainer>
            <StackContainer>
                <StackScreen.Screen
                    name="AuthStack"
                    component={AuthStack}
                    options={{ headerShown: false }}
                />
                <StackScreen.Screen
                    name="MainTab"
                    component={MainTab}
                    options={{ headerShown: false }}
                />
            </StackContainer>
        </NavigationContainer>
    )
}

export default MainNavigation