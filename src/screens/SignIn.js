import React from "react";
import { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    Image,
    Alert,
    ActivityIndicator,
} from "react-native";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

/*
  -- DOCUMENTATION --
*/
const SignIn = ({ props, navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({
        email: undefined,
        password: undefined,
    });

    const onPressRegister = async () => {
        const passwordError =
            password.length > 0 && RegexPassword.test(password)
                ? undefined
                : "Please enter a valid password.";
        const emailError =
            email.length > 0 && RegexEmail.test(email)
                ? undefined
                : "You must enter a valid email.";
        if (passwordError || emailError) {
            setErrors({
                password: passwordError,
                email: emailError,
            });
        } else {
            setLoading(true);
            await signUp(firstName, lastName, email, password);
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View
                style={{
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: 25,
                }}
            >
                <Image
                    source={require("../../assets/icon.png")}
                    style={{ maxHeight: 170, maxWidth: 170, marginTop: 50 }}
                />
                <Text
                    style={{
                        marginTop: 10,
                        fontSize: 50,
                        fontWeight: "bold",
                    }}
                >
                    ReUCLA
                </Text>
                <Text style={styles.subtitle}>
                    Buy, Sell, and Trade{"\n"}Bruin to Bruin 💛💙
                </Text>

                <TextInput
                    onChangeText={setEmail}
                    value={email}
                    title={"Enter your email"}
                    placeholder={"Email"}
                    isPassword={false}
                    autoCorrect={false}
                />

                <TextInput
                    onChangeText={setPassword}
                    value={password}
                    title={"Enter your password"}
                    placeholder={"Password"}
                    isPassword={true}
                    autoCorrect={false}
                />

                <Button
                    title="Log In"
                    onPress={() => Alert.alert("Login")}
                    style={styles.button}
                />

                <View>
                    <Text
                        // onPress={() => Alert.alert("Sign Up")}
                        onPress={() => navigation.navigate("Sign Up")}
                        style={styles.signUp}
                    >
                        New here? Sign up now.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    subtitle: {
        marginTop: 4,
        fontSize: 20,
        color: "#9B9BA5",
        textAlign: "center",
        paddingBottom: 25,
    },
    button: {
        marginTop: 15,
    },
    signUp: {
        fontSize: 16,
        marginTop: 20,
    },
});

export default SignIn;
