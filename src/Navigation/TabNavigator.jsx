import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import ShopStack from './ShopStack'
import CartStack from './CartStack'
import React from 'react'

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
            <Tab.Navigator screenOptions={{
            headerShown: false
            }}
            >
                <Tab.Screen name='ShopTab' component={ShopStack} />
                <Tab.Screen name='CartTab' component={CartStack} />
            </Tab.Navigator>      
    )
}

export default TabNavigator