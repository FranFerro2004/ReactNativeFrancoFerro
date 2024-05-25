import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyProfileScreen from "../Screens/MyProfileScreen";
import ImageSelector from "../Screens/ImageSelector";

const Stack = createNativeStackNavigator();

const MyProfileStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="My Profile" component={MyProfileScreen} />
            <Stack.Screen name="Picture Select" component={ImageSelector} />
        </Stack.Navigator>

    )
}

export default MyProfileStack