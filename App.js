import * as React from "react";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import all screens here
import LandingScreen from "./src/screens/LandingScreen";
// import TestScreen from "./src/screens/TestScreen";
//

// Import all stack screens here
import { SignInStack } from "./src/navigation/SignInStack";
import { NavBarStack } from "./src/navigation/NavBarStack";
//

const Stack = createNativeStackNavigator();

const App = () => {
<<<<<<< HEAD
    const [user, setUser] = useState(true);
=======
    const [user, setUser] = useState(false);
>>>>>>> 60f5558 (Implemented The Add Listing Feature)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem("@signedIn").then((signedIn) => {
            console.log(signedIn);
            // console.log(signedIn);
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

    // if (user) {
    //     return (
    //         <NavigationContainer>
    //             <Stack.Navigator
    //                 screenOptions={{
    //                     headerShown: false,
    //                 }}
    //             >
    //                 <Stack.Screen name="NavBar" component={NavBarStack} />
    //             </Stack.Navigator>
    //         </NavigationContainer>
    //     );
    // } else {
    //     return (
    //         <NavigationContainer>
    //             <Stack.Navigator>
    //                 <Stack.Screen
    //                     name="Sign In Stack"
    //                     component={SignInStack}
    //                     options={{ headerShown: false }}
    //                 />
    //             </Stack.Navigator>
    //         </NavigationContainer>
    //     );
    // }
};

export default App;

const styles = StyleSheet.create({});