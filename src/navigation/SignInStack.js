import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import CreateProfileScreen from "../screens/CreateProfileScreen";
import { NavBarStack } from "./NavBarStack";
import * as ImagePicker from "expo-image-picker";

const Stack = createNativeStackNavigator();

export const SignInStack = (route) => {
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
            <Stack.Screen
                name="NavBarStack"
                component={NavBarStack}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};