import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SavedScreen from "../screens/SavedScreen";
import CategoryScreen from "../screens/CategoryScreen";

const Stack = createNativeStackNavigator();

export const HomeScreenStack = (route) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home Screen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Saved"
                component={SavedScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Category"
                component={CategoryScreen}
                options={{ headerShown: false }}
            />
            
        </Stack.Navigator>
    );
};
