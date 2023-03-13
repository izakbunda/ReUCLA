import React from "react";
import { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    Image,
    Alert,
} from "react-native";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

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
    const [userID, setUID] = useState("")

    useEffect(() => {
        null;
    });

    const onPress = async ( email, password ) => {
        const resp = await asyncSignIn(email, password)
        if (resp == null)
            console.log("empty")
        else{
            console.log(resp);
            setUID(resp.userID);
        }
        // console.log(userID);
    };

    const onChangeHandler = event => {
        setInputValue(event.target.value);
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
                    setText={setEmail}
                    value={email}
                    title={"Enter your email"}
                    placeholder={"Email"}
                    isPassword={false}
                    autoCorrect={false}
                />

                <TextInput
                    setText={setPassword}
                    value={password}
                    title={"Enter your password"}
                    placeholder={"Password"}
                    isPassword={false}
                    autoCorrect={false}
                />

                <Button title="Log In" onPress={ () => {
                        // console.log("The email is: ", email);
                        // console.log("The password is: ", password);
                        onPress(email, password);
                    }} />

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
        paddingBottom: 50,
    },
    button: {
        marginTop: 10,
    },
    signUp: {
        fontSize: 16,
        marginTop: 20,
    },
});

export default SignIn;
