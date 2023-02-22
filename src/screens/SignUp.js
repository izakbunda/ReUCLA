import React from "react";
import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInput from "../components/TextInput";
import { Colors } from "../Constants";
import Button from "../components/Button";

/*
  -- DOCUMENTATION --
*/
const SignUp = ({ props, navigation }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView>
                <View
                    style={{
                        flexDirection: "column",
                        alignItems: "center",
                        paddingTop: 25,
                    }}
                >
                    <Text style={styles.title}>Create your account</Text>

                    <View>
                        <Text style={styles.subtitle}>
                            Tell us a little about yourself
                        </Text>
                        <TextInput
                            onChangeText={setFirstName}
                            value={firstName}
                            title={"First name"}
                            placeholder={"Enter your first name"}
                            isPassword={false}
                            autoCorrect={false}
                        />
                        <TextInput
                            onChangeText={setLastName}
                            value={lastName}
                            title={"Last name"}
                            placeholder={"Enter your last name"}
                            isPassword={false}
                            autoCorrect={false}
                        />

                        <Text style={styles.subtitle}>
                            Now for the real thing
                        </Text>

                        <TextInput
                            onChangeText={setEmail}
                            value={email}
                            title={"Email"}
                            placeholder={"Enter your UCLA email"}
                            isPassword={false}
                            autoCorrect={false}
                        />
                        <TextInput
                            onChangeText={setPassword}
                            value={password}
                            title={"Password"}
                            placeholder={"Enter your password"}
                            isPassword={false}
                            autoCorrect={false}
                        />
                        <TextInput
                            onChangeText={setConfirm}
                            value={confirm}
                            title={"Cofirm Password"}
                            placeholder={"Enter your password again"}
                            isPassword={false}
                            autoCorrect={false}
                        />

                        <Button
                            title="Create Account"
                            onPress={() =>
                                navigation.navigate("Create Profile")
                            }
                            style={styles.button}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
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
        marginTop: 30,
        alignSelf: "center",
    },
});

export default SignUp;
