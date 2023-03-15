import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import AddListingScreen from "../screens/AddListingScreen";
import { HomeScreenStack } from "./HomeScreenStack";
import Icon from "react-native-vector-icons/Feather";

const Tab = createBottomTabNavigator();

export const NavBarStack = (route) => {
    return (
        <Tab.Navigator
            headerMode="false"
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "#2F6B25",
                tabBarStyle: {
                    paddingHorizontal: 30,
                    paddingTop: 10,
                    paddingBottom: 20,
                },
                gestureEnabled: false,
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
                component={HomeScreenStack}
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
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
};
