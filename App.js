import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Cambiado
import { SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';
import TabNavigator from './src/Navigation/TabNavigator';
import { Provider } from 'react-redux';
import store from "./src/store"

const Stack = createNativeStackNavigator(); 

export default function App() {
  
  return (
    <SafeAreaView style={styles.container} >
      <Provider store={store}>
        <TabNavigator/>
      </Provider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
});
