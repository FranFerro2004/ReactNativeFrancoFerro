import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CartScreen from '../Screens/CartScreen';

const Stack = createNativeStackNavigator();

const CartStack = () => {
    return (
        <Stack.Navigator
        initialRouteName='Cart'
        >
            <Stack.Screen name='Cart' component={CartScreen}/>
        </Stack.Navigator>
    )
}

export default CartStack