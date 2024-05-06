import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import ItemListCategory from '../Screens/ItemListCategory'
import HomeScreen from '../Screens/HomeScreen'
import ItemCard from '../Screens/ItemCard';


const Stack = createNativeStackNavigator()

const NavigatorComponent = () => {
    return (
    
            <Stack.Navigator >
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="ItemList" component={ItemListCategory} /> 
                <Stack.Screen name="ItemCard" component={ItemCard} />
            </Stack.Navigator>
        
    
    )
}

export default NavigatorComponent 