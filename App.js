import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';
import { Provider } from 'react-redux';
import store from "./src/store"
import Navigator from './src/Navigation/Navigator';

const Stack = createNativeStackNavigator(); 

export default function App() {
  
  return (
    <SafeAreaView style={styles.container} >
      <Provider store={store}>
        <Navigator/>
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
