import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import all screens here
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import Landing from "./src/screens/Landing";
//
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function NavBarVisible() {
    return (
        <Tab.Navigator headerMode="false">
            <Tab.Screen name="Home" component={Landing} />
            <Tab.Screen name="Explore" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

const App = () => {
    return (
        <NavigationContainer>
            {/* <Home /> */}
            {/* <Profile /> */}
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Home" component={NavBarVisible} />
                {/* <Stack.Screen name="Profile" component={Profile} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
