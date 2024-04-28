import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Cambiado
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/Screens/HomeScreen';
import ItemListCategory from './src/Screens/ItemListCategory';

const Stack = createNativeStackNavigator(); 

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="ItemList" component={ItemListCategory} /> 
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
