import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../Screens/LoginScreen'
import SignUpScreen from '../Screens/SingUpScreen'

const Stack = createNativeStackNavigator()

const AuthStackNavigator = () => {
    

    return (
        
        <Stack.Navigator >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>

    ) 
}

export default AuthStackNavigator