import React from 'react'
import { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './TabNavigator'
import AuthStackNavigator from './AuthStackNavigator'

const Navigator = () => {
    const [user, setUser] = useState(null)

    return (
        <NavigationContainer>
            {user ? <TabNavigator/> : <AuthStackNavigator/>}
        </NavigationContainer>
    )
}

export default Navigator