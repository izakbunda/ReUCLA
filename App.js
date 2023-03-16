import * as React from "react";
import { StyleSheet, LogBox } from "react-native";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import all screens here
import LandingScreen from "./src/screens/LandingScreen";

// Import all stack screens here
import { SignInStack } from "./src/navigation/SignInStack";
import { NavBarStack } from "./src/navigation/NavBarStack";
import {ListingScreen, Dummy} from "./src/screens/ListingScreen.js"
//

const Stack = createNativeStackNavigator();

const App = () => {
    // LogBox.ignoreAllLogs(); // enable to remove all deprecation warnings
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem("@signedIn").then((signedIn) => {
            if (signedIn == "true") {
                setUser(true);
                setLoading(false);
            } else {
                setUser(false);
                setLoading(false);
            }
        });
    }, []);

    return (
        <NavigationContainer>
            {loading ? (
                <LandingScreen />
            ) : user ? (
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="NavBar" component={NavBarStack} /> 
                    {/* TODO: Change Dummy back to NavBarStack */}
                </Stack.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen
                        name="Sign In Stack"
                        component={SignInStack}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
 }
export default App;
