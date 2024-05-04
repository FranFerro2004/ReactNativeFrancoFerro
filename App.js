import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Cambiado
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import TabNavigator from './src/Navigation/TabNavigator';
import { Provider } from 'react-redux';
import store from "./src/store"

const Stack = createNativeStackNavigator(); 

export default function App() {
  
  return (
    <SafeAreaView>
      <Provider store={store}>
        <TabNavigator/>
      </Provider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
