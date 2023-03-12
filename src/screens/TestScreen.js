import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
/*
  -- DOCUMENTATION --
*/

const asyncSignUp = async (email, password) => {
    console.log("HERE!!!");
    return await fetch("http://localhost:4000/", {
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

const TestScreen = ({ props, resp }) => {
    const [test, setTest] = useState(null);
    if (test == null) console.log("test has no value");
    const onPress = async () => {
        const username = "lawrencetlee@ucla.edu";
        const password = "password";
        const resp = await asyncSignUp(username, password);
        if (resp == null) console.log("empty");
        console.log(resp);
        setTest(resp.bye);
    };

    return (
        <View style={{ marginTop: 100, marginLeft: 150 }}>
            <TouchableOpacity onPress={onPress}>
                <Text>POST REQUEST</Text>
                <View>{test ? <Text>{test}</Text> : null}</View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({});

export default TestScreen;
