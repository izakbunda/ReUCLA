import React from "react";
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Alert,
    Keyboard,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Platform,
} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInput from "../components/TextInput";
import { Colors } from "../Constants";
import Button from "../components/Button";
import { RegexEmail, RegexPassword, RegexName } from "../Constants";
import { Underline } from "react-native-feather";
import Icon from "react-native-vector-icons/Feather";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
/*
  -- DOCUMENTATION --
*/
const asyncSignUp = async (email, password, first_name, last_name) => {
    // console.log("HERE!!!")
    // console.log(email)
    return await fetch("http://localhost:4000/create/User", {
            // If you are posting something, use POST
            // If you are fetching something, use GET
            method: "POST",
            headers: {
                  "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, first_name, last_name  }),
      })
            .then((res) => res.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                  return error;
            });
};

const SignUp = ({ props, navigation }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [userID, setUID] = useState("");

    const [errors, setErrors] = useState({
        firstName: undefined,
        lastName: undefined,
        password: undefined,
        confirm: undefined,
        email: undefined,
    });

    // console.log(errors);
    // console.log(lastName);

    const onPressRegister = async () => {
        const firstNameError =
            firstName.length > 0 ? undefined : "You must enter a first name.";
        const lastNameError =
            lastName.length > 0 ? undefined : "You must enter a last name.";
        const passwordError =
            password.length > 0 && RegexPassword.test(password)
                ? undefined
                : "Please enter a valid password.";
        const confirmError =
            password !== confirm && password.length > 0
                ? "Passwords don't match"
                : undefined;
        const emailError =
            email.length > 0 && RegexEmail.test(email)
                ? undefined
                : "You must enter an email.";

        if (
            firstNameError ||
            lastNameError ||
            passwordError ||
            confirmError ||
            emailError
        ) {
            setErrors({
                firstName: firstNameError,
                lastName: lastNameError,
                password: passwordError,
                confirm: confirmError,
                email: emailError,
            });
        } else {
            setLoading(true);
            const resp = await asyncSignUp(
                email,
                password,
                firstName,
                lastName
            );
            console.log(resp);
            setUID(resp.userID);
            // console.log("HELLO " + userID);
            AsyncStorage.setItem("@userId", resp.userID); // confirm this stores !!
            AsyncStorage.setItem("@firstName", resp.userData.firstName); // confirm this stores !!
            AsyncStorage.setItem("@lastName", resp.userData.lastName);
            AsyncStorage.setItem("@firstName", resp.userData.firstName);
            AsyncStorage.setItem("@signedIn", "false");
            // AsyncStorage.getItem("@firstName", (err, item) =>
            //     console.log("FIRST NAME FROM SIGN UP:" + item)
            // );
            // AsyncStorage.getItem("@userId", (err, item) =>
            //     console.log("USERID FROM SIGN IN:" + item)
            // );
            setLoading(false);
            navigation.navigate("Create Profile");
        }
    };

    // console.log(userID);

    return (
        <KeyboardAwareScrollView
            style={{
                backgroundColor: "white",
                flex: Platform.OS === "ios" ? 1 : null,
                paddingTop: 0,
            }}
            contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
            }}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            extraScrollHeight={25}
            keyboardShouldPersistTaps="handled"
        >
            <SafeAreaView>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                            paddingTop: 25,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Sign In")}
                        >
                            <Icon
                                name={"arrow-left"}
                                size={30}
                                color={"#2F6B25"}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <Text style={styles.title}>Create your account</Text>

                            <View>
                                <Text style={styles.subtitle}>
                                    Tell us a little about yourself
                                </Text>

                                <TextInput
                                    setText={setFirstName}
                                    value={firstName}
                                    title={"First name"}
                                    placeholder={"Enter your first name"}
                                    isPassword={false}
                                    autoCorrect={false}
                                    error={errors.firstName}
                                    errorMessage={"Enter a valid first name."}
                                    onEndEditing={() => {
                                        if (!RegexName.test(firstName)) {
                                            setErrors({
                                                ...errors,
                                                firstName:
                                                    "Please enter a valid first name.",
                                            });
                                        } else {
                                            setErrors({
                                                ...errors,
                                                firstName: undefined,
                                            });
                                        }
                                    }}
                                />

                                <TextInput
                                    setText={setLastName}
                                    value={lastName}
                                    title={"Last name"}
                                    placeholder={"Enter your last name"}
                                    isPassword={false}
                                    autoCorrect={false}
                                    error={errors.lastName}
                                    errorMessage={"Enter a valid last name."}
                                    onEndEditing={() => {
                                        if (!RegexName.test(lastName)) {
                                            setErrors({
                                                ...errors,
                                                lastName:
                                                    "Please enter a valid last name.",
                                            });
                                        } else {
                                            setErrors({
                                                ...errors,
                                                lastName: undefined,
                                            });
                                        }
                                    }}
                                />

                                <Text style={styles.subtitle}>
                                    Now for the real thing
                                </Text>

                            <TextInput
                                setText={setEmail}
                                value={email}
                                title={"Email"}
                                placeholder={"Enter your UCLA email"}
                                isPassword={false}
                                autoCorrect={false}
                                error={errors.email}
                                errorMessage={
                                    "Enter a valid email ucla.edu email."
                                }
                                onEndEditing={() => {
                                    if (!RegexEmail.test(email)) {
                                        setErrors({
                                            ...errors,
                                            email: "Please enter a valid password.",
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
                                title={"Password"}
                                placeholder={"Enter your password"}
                                isPassword={true}
                                autoCorrect={false}
                                error={errors.password}
                                errorMessage={
                                    "Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and a special character."
                                }
                                onEndEditing={() => {
                                    if (!RegexPassword.test(password)) {
                                        setErrors({
                                            ...errors,
                                            password:
                                                "Please enter a valid password.",
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
                            <TextInput
                                setText={setConfirm}
                                value={confirm}
                                title={"Cofirm Password"}
                                placeholder={"Enter your password again"}
                                isPassword={true}
                                autoCorrect={false}
                                error={errors.confirm}
                                errorMessage={"Your password does not match."}
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
                                        title="Create Account"
                                        onPress={onPressRegister}
                                        style={styles.button}
                                    />
                                )}
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    title: {
        marginTop: 4,
        fontSize: 25,
        color: Colors.darkGray,
        textAlign: "center",
        fontWeight: "bold",
        paddingBottom: 30,
    },
    subtitle: {
        paddingLeft: 20,
        marginTop: 20,
        fontSize: 17,
        color: Colors.darkGray,
        textAlign: "left",
        fontWeight: "bold",
        paddingBottom: 30,
    },
    button: {
        marginTop: 40,
        alignSelf: "center",
    },
    activity: { marginTop: 20, marginBottom: 40 },
    icon: {
        alignSelf: "flex-start",
        position: "absolute",
        top: 5,
        left: -170,
    },
    activity: { marginTop: 20, marginBottom: 40 },
    icon: {
        alignSelf: "flex-start",
        position: "absolute",
        top: 5,
        left: -170,
    },
});

export default SignUp;