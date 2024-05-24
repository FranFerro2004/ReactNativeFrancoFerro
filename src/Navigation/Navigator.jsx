import React from 'react'
import { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './TabNavigator'
import AuthStackNavigator from './AuthStackNavigator'
import { useSelector } from 'react-redux'

const Navigator = () => {
    const { user } = useSelector(state => state.auth.value)

    return (
        <NavigationContainer>
            {user ? <TabNavigator/> : <AuthStackNavigator/>}
        </NavigationContainer>
    )
}

export default Navigator