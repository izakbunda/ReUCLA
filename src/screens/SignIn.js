import React from "react";
import { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { Colors } from "../Constants";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { RegexEmail, RegexPassword } from "../Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

/*
  -- DOCUMENTATION --
*/

const asyncSignIn = async (email, password) => {
    // console.log(email)
    return await fetch("http://localhost:4000/user/signIn", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            return error;
        });
};

const SignIn = ({ props, navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userID, setUID] = useState("");
    const [loading, setLoading] = useState(false);

    // console.log(email);
    // console.log(password);

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
            const resp = await asyncSignIn(email, password);

            if (!resp.status){
                // if (resp == null) console.log("empty");
            console.log(resp);
            setUID(resp.userID);
            setLoading(false);
            AsyncStorage.setItem("@userId", userID); // confirm this stores !!
            AsyncStorage.setItem("@signedIn", "true");

            AsyncStorage.setItem("@firstName", resp.userData.firstName);
            AsyncStorage.setItem("@lastName", resp.userData.lastName);
            AsyncStorage.setItem("@bio", resp.userData.bio);
            AsyncStorage.setItem("@instagram", resp.userData.contact[0]);
            AsyncStorage.setItem("@discord", resp.userData.contact[1]);
            AsyncStorage.setItem("@twitter", resp.userData.contact[2]);
            AsyncStorage.setItem("@major", resp.userData.major);
            AsyncStorage.setItem("@pfpURI", resp.userData.signInPath);

            navigation.navigate("NavBarStack");
            // AsyncStorage.getItem("@userId", (err, item) =>
            //     console.log("USER ID FROM SIGN IN:" + item)
            // );
            }
            else{
                setErrors({
                    password: emailError
                });
                setLoading(false);
            }
        }
    };

    return (
        <KeyboardAwareScrollView
            style={{
                backgroundColor: "white",
                flex: Platform.OS === "ios" ? 1 : null,
                paddingTop: 30,
            }}
            contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
            }}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            extraScrollHeight={25}
            keyboardShouldPersistTaps="handled"
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View
                    style={{
                        flexDirection: "column",
                        alignItems: "center",
                        paddingTop: 25,
                    }}
                >
                    <TouchableOpacity onPress={() => AsyncStorage.clear()}>
                        <Image
                            source={require("../../assets/204CF76C-0F8F-4FB6-99B7-ACAB2C7D8548logo.png")}
                            style={{
                                maxHeight: 170,
                                maxWidth: 170,
                                marginTop: 50,
                                marginBottom: -10,
                            }}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            marginTop: 10,
                            fontSize: 50,
                            fontWeight: "bold",
                        }}
                    >
                        ReUCLA
                    </Text>

                    <Text style={styles.subtitle}>Buy, Sell, and Trade</Text>

                    <TextInput
                        setText={setEmail}
                        value={email}
                        title={"Enter your email"}
                        placeholder={"Email"}
                        isPassword={false}
                        autoCorrect={false}
                        error={errors.email}
                        errorMessage={"Enter a valid email."}
                        onEndEditing={() => {
                            if (!RegexEmail.test(email)) {
                                setErrors({
                                    ...errors,
                                    email: "Please enter a valid email.",
                                });
                            } else {
                                setErrors({
                                    ...errors,
                                    email: undefined,
                                });
                            }
                        }}
                        autoCapitalize={"none"}
                    />
                    <TextInput
                        setText={setPassword}
                        value={password}
                        title={"Enter your password"}
                        placeholder={"Password"}
                        isPassword={true}
                        autoCorrect={false}
                        error={errors.password}
                        errorMessage={"Enter a valid password."}
                        onEndEditing={() => {
                            if (!RegexPassword.test(password)) {
                                setErrors({
                                    ...errors,
                                    password: "Please enter a valid password.",
                                });
                            } else {
                                setErrors({
                                    ...errors,
                                    password: undefined,
                                });
                            }
                        }}
                        autoCapitalize={"none"}
                    />

                    <View>
                        {loading ? (
                            <ActivityIndicator
                                size="large"
                                color={Colors.primary}
                                style={styles.activity}
                            />
                        ) : (
                            <Button
                                title="Log In"
                                onPress={onPressRegister}
                                style={styles.button}
                            />
                        )}
                    </View>

                    <View>
                        <Text
                            onPress={() => navigation.navigate("Sign Up")}
                            style={styles.signUp}
                        >
                            New here? Sign up now.
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
    },
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
    activity: { marginTop: 20, marginBottom: 10 },
    signUp: {
        fontSize: 16,
        marginTop: 20,
    },
});

export default SignIn;
