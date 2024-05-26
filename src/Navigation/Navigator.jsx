import React, { useEffect } from 'react'
import { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './TabNavigator'
import AuthStackNavigator from './AuthStackNavigator'
import { useDispatch, useSelector } from 'react-redux'
import { getSession } from '../persistence'
import { setUser } from '../Features/User/userSlice'

const Navigator = () => {
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth.value)

    useEffect(()=> {
        (async ()=> {
        try {
            const response = await getSession()
            if (response.rows._array.length) {
                const user = response.rows._array[0]
                console.log({user});
                dispatch(setUser({
                email: user.email,
                localId: user.localId,
                idToken: user.token
            }))
            }
        } catch (error) {
            console.log(error);
        }
        })()
    }, [])

    return (
        <NavigationContainer>
            {user ? <TabNavigator/> : <AuthStackNavigator/>}
        </NavigationContainer>
    )
}

export default Navigator