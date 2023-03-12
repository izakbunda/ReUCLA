import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";
import { Dim } from "./src/Constants";

// Import all screens here
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import CreateProfileScreen from "./src/screens/CreateProfileScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SearchScreen from "./src/screens/SearchScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import LandingScreen from "./src/screens/LandingScreen";
import AddListingScreen from "./src/screens/AddListingScreen";
import TestScreen from "./src/screens/TestScreen";
//

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// const profileProps = {
//     profilePhoto: "https://google.com",
//     name: "Izak Bunda",
//     bio: "Hello! I am a 2nd year UCLA student interested in fashion. I have a problem of buying too many clothes, so this is my solution. Feel free to message me to negotiate, none of the prices are final!",
//     contactInformation: [7609942957, "@izakbunda", "izakbunda@gmail.com"],
//     listings: [
//         {
//             listingPhoto: "https://google.com",
//             listingPrice: 10,
//             listingname: "magic pants",
//             listingDescription: "these are pants!",
//             category: ["clothing", "menswear", "bottoms"],
//             condition: 1,
//         },
//         {
//             listingPhoto: "https://google.com",
//             listingPrice: 7,
//             listingname: "vintage shirt",
//             listingDescription: "these are from the 90s!",
//             category: ["clothing", "menswear", "tops"],
//             condition: 1,
//         },
//         {
//             listingPhoto: "https://google.com",
//             listingPrice: 20,
//             listingname: "lava lamp",
//             listingDescription:
//                 "I got scared of lava lamps, so I don't use anymore!",
//             category: ["homegoods", "bedroom", "lights"],
//             condition: 1,
//         },
//     ],
// };

function NavBarVisible(route) {
    return (
        <Tab.Navigator
           headerMode="false"
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "#2F6B25",
                tabBarStyle: {
                    padding: 10,
                    paddingTop: 10,
                    paddingBottom: 20,
                    // margin: 20,
                    // width: Dim.width - 40,
                    // borderRadius: 25,
                },
                // tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case "Home":
                            iconName = "home";
                            break;
                        case "Add":
                            iconName = "plus-square";
                            break;
                        case "Profile":
                            iconName = "user";
                            break;
                        default:
                            break;
                    }
                    return <Icon name={iconName} size={30} color={color} />;
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />

            <Tab.Screen
                name="Add"
                component={AddListingScreen}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                // children={() => <ProfileScreen propName={profileProps} />}
                // {(profileProps) => ( <ProfileScreen {...profileProps} otherProp={otherProp} />)}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
}

function SignInFlow(route) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Sign In"
                component={SignIn}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Sign Up"
                component={SignUp}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Create Profile"
                component={CreateProfileScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

const App = () => {
    const [user, setUser] = useState(false);

    if (user) {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                    initialRouteName="HomeStack"
                >
                    <Stack.Screen name="HomeStack" component={NavBarVisible} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Sign In Flow"
                        component={TestScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
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
